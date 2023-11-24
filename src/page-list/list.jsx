import { useState } from "react";
import "./list.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [liste, setliste] = useState([]);
  useEffect(() => {
    const reponsePromise = fetch("http://localhost:3005/api/produits");
    reponsePromise.then((response) => {
      const jsonpromise = response.json();
      jsonpromise.then((t) => {
        setliste(t);
      });
    });
  }, []);

  return (
    <>
      <nav class="navbar bg-body-terti ">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png?20220213013322"
              alt="Bootstrap"
              width="120"
              height="35"
              className="img"
            />
          </a>
          <a className="a" href="/formulaire">
            NEW Produit
          </a>
        </div>
      </nav>
      <div className="continer">
        <table class="table">
          <thead>
            <tr className="color">
              <th className="th">#</th>
              <th>Nom_Produit</th>
              <th>Descripstion</th>
              <th>Qnt</th>
              <th>Prix</th>
              <th className="th">Action</th>
            </tr>
          </thead>
          <tbody>
            {liste.map((e, i) => {
              return (
                <>
                  <tr>
                    <th className="th">{i + 1}</th>
                    <td>{e.nom}</td>
                    <td>{e.description}</td>
                    <td>{e.quantite}</td>
                    <td>{e.prix}</td>
                    <td className="td th">
                      <button type="button" class="btn btn-success" onClick={()=>
                      {
                        navigate("/formulaire/"+e.id)
                      }}>
                        Modify
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={async () => {
                          const res = await fetch(
                            "http://localhost:3005/api/produits/" + e.id,
                            {
                              method: "DELETE",
                            }
                          );
                          if (res.ok) {
                            const lis = [...liste];
                            lis.splice(i, 1);
                            setliste(lis);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
