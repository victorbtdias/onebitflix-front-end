import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "../styles/profile.module.scss";
import PasswordForm from "@/src/components/profile/password";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "@/src/components/common/spinner";

const UserInfo = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState("userForm");

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "userForm" ? "#ff0044" : "white" }}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "passwordForm" ? "#ff0044" : "white" }}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default UserInfo;
