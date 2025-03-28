import React, { CSSProperties } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f3f4f6",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #d1d5db", // Updated border to match border-gray-300 in Tailwind
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center" as CSSProperties["textAlign"],
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
  },
  input: {
    marginTop: "0.25rem",
    display: "block",
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
    outline: "none",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  linkText: {
    marginTop: "1rem",
    textAlign: "center" as CSSProperties["textAlign"],
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "underline",
  },
};

function RegisterPage() {
  const { push } = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Fitur Register Belum Tersedia!");
    alert("Tapi boleh lah sementara di redirect ke ( /products )");

    push("/products");
  };

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>

      <div className={inter.className} style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Register</h1>

          <form onSubmit={handleSubmit} className={inter.className}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inter.className}
                style={styles.input}
                placeholder="Enter your email"
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={inter.className}
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className={inter.className}
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b82f6")
              }
            >
              Register
            </button>
          </form>

          <p style={styles.linkText}>
            Sudah punya akun?{" "}
            <Link href={"/auth/login"} style={styles.link}>
              login disini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
