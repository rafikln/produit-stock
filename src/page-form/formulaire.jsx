import { useState } from "react";
import "./formulaire.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setnom] = useState("");
  const [des, setdes] = useState("");
  const [qnt, setqnt] = useState("");
  const [prix, setprix] = useState("");

  useEffect(() => {
    if (id) {
      const reponsePromise = fetch("http://localhost:3005/api/produits/" + id);
      reponsePromise.then((response) => {
        const jsonpromise = response.json();
        jsonpromise.then((t) => {
          setnom(t.nom);
          setdes(t.description);
          setqnt(t.quantite);
          setprix(t.prix);
        });
      });
    }
  }, []);

  return (
    <>
      <div className="for">
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            if (!id) {
              const res = await fetch("http://localhost:3005/api/Products", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  nom: nom,
                  description: des,
                  quantite: qnt,
                  prix: prix,
                }),
              });

              if (!res.ok) {
                const data = await res.json();
                toast.error(data.message);
              } else {
                navigate("/");
              }
            } else {
              const res = await fetch(
                "http://localhost:3005/api/produits/" + id,
                {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    nom: nom,
                    description: des,
                    quantite: qnt,
                    prix: prix,
                  }),
                }
              );
              if (!res.ok) {
                const data = await res.json();
                toast.error(data.message);
              } else {
                navigate("/");
              }
            }
          }}
        >
          <div>
            <label htmlFor="">Nom Produit</label>
            <input
              value={nom}
              type="text"
              className="form-control mm"
              onChange={(e) => {
                setnom(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label htmlFor=""> Déscription</label>
            <textarea
              value={des}
              name=""
              id=""
              cols="98"
              rows="4"
              className="form-control mm"
              required
              onChange={(e) => {
                setdes(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <label htmlFor="">Quantite</label>
            <input
              value={qnt}
              required
              type="number"
              className="form-control mm"
              onChange={(e) => {
                setqnt(e.target.value);
              }}
            />
          </div>
          <div>
            {" "}
            <label htmlFor="">Prix</label>
            <input
              value={prix}
              required
              type="number"
              className="form-control mm"
              onChange={(e) => {
                setprix(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-success">Ajouter</button>
          <button
            type="button"
            class="btn  btn-warning"
            onClick={() => {
              navigate("/");
            }}
          >
            Roture
          </button>
        </form>
      </div>
    </>
  );
};
export default Form;
