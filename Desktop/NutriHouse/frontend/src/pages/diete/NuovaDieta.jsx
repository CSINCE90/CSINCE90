import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createDieta } from "../../services/api";

const NuovaDieta = () => {
  const initialValues = {
    nome: "",
    descrizione: "",
    kcalTotali: "",
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome obbligatorio"),
    descrizione: Yup.string().required("Descrizione obbligatoria"),
    kcalTotali: Yup.number()
      .required("Kcal totali obbligatorie")
      .positive("Valore non valido")
      .integer("Deve essere un numero intero"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createDieta(values);
      alert("Dieta creata con successo!");
      resetForm();
    } catch (error) {
      console.error("Errore durante la creazione della dieta:", error);
      alert("Errore durante la creazione della dieta.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Nuova Dieta</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="nome">Nome</label>
              <Field type="text" name="nome" />
              <ErrorMessage name="nome" component="div" />
            </div>
            <div>
              <label htmlFor="descrizione">Descrizione</label>
              <Field as="textarea" name="descrizione" />
              <ErrorMessage name="descrizione" component="div" />
            </div>
            <div>
              <label htmlFor="kcalTotali">Kcal Totali</label>
              <Field type="number" name="kcalTotali" />
              <ErrorMessage name="kcalTotali" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Salva Dieta
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NuovaDieta;