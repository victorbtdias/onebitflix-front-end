import documentService, { DocumentType } from "@/src/services/documentService";
import uploadService from "@/src/services/uploadService";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import styles from "../../../styles/profile.module.scss";

const DocumentForm = function () {
  const [file, setFile] = useState();
  const [imageKeys, setImageKeys] = useState<DocumentType>();

  const fileSelected = (file: any) => {
    setFile(file);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await uploadService.uploadDocument(file);

    // const imageKey = res.imagePath.replace(/^\/images\//, "");

    // setImageKeys([imageKey, ...imageKeys]);
  };

  const handleDelete = async (id: number, key: string) => {
    await uploadService.deleteDocument(id, key);
  };

  const getDocuments = async () => {
    const res = await documentService.show();

    if (res.status === 200) {
      setImageKeys(res.data);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <Form className={styles.form} onSubmit={submit}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="document">
              Documento
            </Label>
            <Input
              name="document"
              id="document"
              type="file"
              required
              className={styles.input}
              accept="application/pdf"
              onChange={(event) => {
                fileSelected(event.target.files?.[0]);
              }}
            />
          </FormGroup>
          <Button type="submit" className={styles.formBtn} outline>
            Salvar
          </Button>
          <Button
            className={styles.formBtn}
            outline
            onClick={() => handleDelete(imageKeys!.id, imageKeys!.document)}
          >
            Deletar
          </Button>
          <div>{imageKeys?.id}</div>
          <div>
            <Button>
              <Link
                href={`${process.env.NEXT_PUBLIC_BASEURL}/images/${imageKeys?.document}`}
                onClick={async (e) => {
                  e.preventDefault();
                  const token = sessionStorage.getItem("onebitflix-token");
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASEURL}/images/${imageKeys?.document}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const fileBlob = await res.blob();
                  const file = new File([fileBlob], `${imageKeys?.document}`, {
                    type: "application/pdf",
                  });
                  const fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
                }}
              >
                Arquivo
              </Link>
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default DocumentForm;
