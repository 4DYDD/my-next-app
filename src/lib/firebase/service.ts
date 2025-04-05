import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";
import { UserType } from "@/types/usertype";

const firestore = getFirestore(app);

//
//
//
//
//
//
/**
 * Mengambil data dari collection yang ditentukan.
 * @param {string} collectionName Nama collection yang akan diambil data.
 * @return {Promise<Array<DocumentData>>} Data yang diambil berupa array of object, atau kosong jika data tidak ditemukan.
 */
export async function retrieveData(
  collectionName: string
): Promise<Array<DocumentData> | undefined> {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
//
//
//
//
//
//

//
//
//
//
//
//
/**
 * Mengambil data berdasarkan id tertentu dari collection yang
 * ditentukan.
 * @param {string} collectionName Nama collection yang akan diambil data.
 * @param {string} id ID data yang akan diambil.
 * @return {Promise<Object | null>} Data yang diambil berupa object, atau null
 * jika data tidak ditemukan.
 */
export async function retrieveDataById(
  collectionName: string,
  id: string
): Promise<DocumentData | undefined> {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}
//
//
//
//
//
//

//
//
//
//
//
//
/**
 * Sign in user with credentials.
 * @param {Object} credentials Object yang berisi email dan password.
 * @prop {string} credentials.email Email yang digunakan untuk sign in.
 * @prop {string} credentials.password Password yang digunakan untuk sign in.
 * @return {Promise<UserType | null>} Data user jika sign in berhasil, atau null jika sign in gagal.
 */
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserType | null> {
  // Jika email atau password kosong maka kembalikan null
  if (email === "" || password === "") {
    return null;
  }

  // Buat query untuk mendapatkan data user berdasarkan (type credential) dan (email yang diberikan)
  const q = query(
    collection(firestore, "users"),
    where("email", "==", email),
    where("type", "==", "credential")
  );

  // Dapatkan hasil query dan ubah menjadi array
  const snapshot = await getDocs(q);
  const data: Array<UserType> = snapshot.docs.map((doc) => ({
    id: doc.id, // Ambil ID document
    email: doc.data().email, // Ambil email user
    fullname: doc.data().fullname, // Ambil fullname user
    password: doc.data().password, // Ambil password user
    image: doc.data().image || "", // Ambil image user (jika ada)
    type: doc.data().type || "", // Ambil type user (jika ada)
    role: doc.data().role, // Ambil role user
  }));

  // Jika data user ditemukan maka kembalikan data user, jika tidak maka kembalikan null
  return data[0] || null;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    type?: string;
    image?: string;
    role?: string;
  },
  callback: Function
) {
  // ===> VALIDASI INPUT AGAR TIDAK KOSONG
  if (userData.fullname === "") {
    callback({ status: false, message: "Fullname is Required!" });
    return;
  }
  if (userData.email === "") {
    callback({ status: false, message: "Email is Required!" });
    return;
  }
  if (userData.password === "") {
    callback({ status: false, message: "Password is Required!" });
    return;
  }
  // ===> VALIDASI INPUT AGAR TIDAK KOSONG

  // ===> CARI EMAIL DUPLIKAT DI DATABASE FIRESTORE
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // ===> CARI EMAIL DUPLIKAT DI DATABASE FIRESTORE

  // ===> JIKA DUPLIKAT
  if (data.length > 0) {
    callback({ status: false, message: "Email Already Exists" });
  }
  // ===> JIKA DUPLIKAT

  // ===> JIKA TIDAK DUPLIKAT
  else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.type = "credential";
    userData.role = "member";

    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register Success" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
  // ===> JIKA TIDAK DUPLIKAT
}

export async function signInWithGoogle(userData: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);

  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign In with Google Success!",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign In with Google Failed!" });
      });
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign In with Google Success!",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign In with Google Failed!" });
      });
  }
}
