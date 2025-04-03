import {
  addDoc,
  collection,
  doc,
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

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn(userData: {
  email: string;
  password: string;
}): Promise<UserType | null> {
  if (userData.email === "") {
    return null;
  }
  if (userData.password === "") {
    return null;
  }

  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email),
    where("type", "==", "credential")
  );
  const snapshot = await getDocs(q);

  const data: Array<UserType> = snapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
    fullname: doc.data().fullname,
    password: doc.data().password,
    image: doc.data().image || "",
    type: doc.data().type || "",
    role: doc.data().role,
  }));

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

  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "Email Already Exists" });
  } else {
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
