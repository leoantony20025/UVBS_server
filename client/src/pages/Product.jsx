import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import {
  useAddProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../graphql/mutation/product";
import { getProducts } from "../redux/slices/adminSlice";
import "./Video.css";
import Nav from "../components/Nav";
import loader from "../assets/loader.svg";
import { useGetAllProducts } from "../graphql/query/product";
import iDelR from "../assets/iDelR.png";
import iEditR from "../assets/iEditR.png";
import iCatW from "../assets/iCatW.png";
import iCloseR from "../assets/iCloseR.png";

function Product() {
  const [video, setVideo] = useState({
    open: false,
    id: "",
    name: "",
    description: "",
    photo: "",
    price: "",
    stock: "",
  });
  const [add, setAdd] = useState({
    open: false,
  });
  const [err, setErr] = useState({
    open: false,
    msg: "",
  });
  const [search, setSearch] = useState({
    word: "",
    videos: [],
  });
  const { products: videos } = useSelector((state) => state.admin);
  const [load, setLoading] = useState(false);
  const [displayVideos, setDisplayVideos] = useState([]);
  const dispatch = useDispatch();
  const {
    loading: gettingVideos,
    data: cloudVideos = [],
    error: errorVideos,
  } = useGetAllProducts();
  const { addProduct, loading: addingVideo } = useAddProduct();
  const { updateProduct, loading: updatingVideo } = useUpdateProduct();
  const { deleteProduct, loading: deletingVideo } = useDeleteProduct();

  console.log(videos);

  // DisplaySkills and Error corrections
  useEffect(() => {
    if (cloudVideos?.length !== 0) {
      setDisplayVideos(cloudVideos);
      dispatch(getProducts(cloudVideos));
      setErr({ open: false, msg: "" });
    }
  }, [cloudVideos]);

  useEffect(() => {
    if (videos?.length !== 0) {
      setDisplayVideos(videos);
      setErr({ open: false, msg: "" });
    }
  }, [videos]);

  useEffect(() => {
    if (displayVideos?.length !== 0) {
      setErr({ open: false, msg: "" });
    }
  }, [displayVideos]);

  // Add
  const addNewVideo = async () => {
    if (
      video.name !== "" &&
      video.description !== "" &&
      video.photo !== "" &&
      video.price !== "" &&
      video.stock !== ""
    ) {
      let { data } = await addProduct({
        variables: video,
      });
      if (data?.addVideo?.length !== 0) {
        dispatch(getProducts(data?.addProduct));
        setDisplayVideos(data?.addProduct);
        setVideo({
          open: false,
          id: "",
          name: "",
          description: "",
          photo: "",
          price: "",
          stock: "",
        });
        setAdd({
          open: false,
        });
      }
    } else {
      setErr({
        open: true,
        msg: "Enter all the fields!",
      });
    }
  };

  const updateVid = async () => {
    if (
      video.name !== "" &&
      video.description !== "" &&
      video.photo !== "" &&
      video.price !== "" &&
      video.stock !== ""
    ) {
      let { data } = await updateProduct({
        variables: video,
      });
      if (data?.updateVideo?.length !== 0) {
        dispatch(getProducts(data?.updateProduct));
        setDisplayVideos(data?.updateProduct);
        setVideo({
          open: false,
          id: "",
          name: "",
          description: "",
          photo: "",
          price: "",
          stock: "",
        });
        setAdd({
          open: false,
        });
      }
    } else {
      setErr({
        open: true,
        msg: "Enter all the fields!",
      });
    }
  };

  // Delete
  const deleteCat = async (id) => {
    const { data } = await deleteProduct({
      variables: { id },
    });
    if (data?.deleteVideo !== 0) {
      setDisplayVideos(data?.deleteProduct);
      setVideo({ open: false, id: "", name: "" });
    } else {
      setErr({
        open: true,
        msg: "Something went wrong!",
      });
    }
  };

  return (
    <>
      {gettingVideos ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "grid",
            placeContent: "center",
          }}
        >
          <img style={{ width: "40px" }} src={loader} alt="" />
        </div>
      ) : (
        <div className="video">
          <div className="v-head">
            <p>Products</p>
            <div className="v-icon" onClick={() => setAdd({ open: true })}>
              <img
                className="sIcon"
                src="https://img.icons8.com/ios-glyphs/50/ffffff/plus-math.png"
                alt=""
              />
              <p>Add New</p>
            </div>
          </div>

          {add.open && (
            <div className="add">
              <div className="v-add">
                <div className="va-head">
                  <p>Video</p>
                  <img
                    onClick={() => setAdd({ open: false })}
                    src={iCloseR}
                    alt=""
                  />
                </div>
                <div className="va-body">
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewVideo()}
                    placeholder="name"
                    value={video.name}
                    onChange={(e) =>
                      setVideo({ ...video, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewVideo()}
                    placeholder="Description"
                    value={video.description}
                    onChange={(e) =>
                      setVideo({ ...video, description: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewVideo()}
                    placeholder="photo URL"
                    value={video.photo}
                    onChange={(e) =>
                      setVideo({ ...video, photo: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    onKeyDown={(e) => e.key === "Enter" && addNewVideo()}
                    placeholder="Price"
                    value={video.price}
                    onChange={(e) =>
                      setVideo({
                        ...video,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    onKeyDown={(e) => e.key === "Enter" && addNewVideo()}
                    placeholder="Stock"
                    value={video.stock}
                    onChange={(e) =>
                      setVideo({
                        ...video,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                  <button disabled={addingVideo} onClick={() => addNewVideo()}>
                    Add Product
                  </button>
                </div>
                {addingVideo && (
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      placeContent: "center",
                      marginBottom: "-20px",
                      marginTop: "10px",
                    }}
                  >
                    <img style={{ width: "30px" }} src={loader} alt="" />
                  </div>
                )}
              </div>
            </div>
          )}

          {gettingVideos ? (
            <div>
              <img
                style={{
                  width: "40px",
                  height: "200px",
                  display: "grid",
                  placeContent: "center",
                }}
                src={loader}
                alt=""
              />
            </div>
          ) : displayVideos.length !== 0 ? (
            <div className="v-list">
              {displayVideos.map((c) => (
                <div className="vl-video" key={c?.id}>
                  <img src={c?.photo} alt="" />
                  <div className="vl-body">
                    <div className="vl-cont">
                      <p>{c?.name}</p>
                      <h5 style={{ margin: "10px 0" }}>{c?.description}</h5>
                    </div>
                    <div className="vl-btns">
                      <img
                        onClick={() =>
                          setVideo({
                            open: true,
                            id: c?.id,
                            name: c?.name,
                            description: c?.description,
                            photo: c?.photo,
                            price: c?.price,
                            stock: c?.stock,
                          })
                        }
                        src={iEditR}
                        alt=""
                      />
                      <img
                        onClick={() => deleteCat(c?.id)}
                        src={iDelR}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
              {deletingVideo && (
                <img style={{ width: "40px" }} src={loader} alt="" />
              )}
            </div>
          ) : (
            <p style={{ color: "red", marginTop: "30px" }}>No records found!</p>
          )}
        </div>
      )}

      {video.open && (
        <div className="add">
          <div className="v-add">
            <div className="va-head">
              <p>Audio</p>
              <img
                onClick={() =>
                  setVideo({
                    open: false,
                    id: "",
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    stock: "",
                  })
                }
                src="https://img.icons8.com/ios/48/fc3737/delete-sign--v1.png"
                alt=""
              />
            </div>
            <div className="va-body">
              <p>{video.name}</p>
              <input
                type="text"
                placeholder="name"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                value={video.name}
                onChange={(e) => setVideo({ ...video, name: e.target.value })}
              />
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                placeholder="Description"
                value={video.description}
                onChange={(e) =>
                  setVideo({ ...video, description: e.target.value })
                }
              />
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                placeholder="photo URL"
                value={video.photo}
                onChange={(e) => setVideo({ ...video, photo: e.target.value })}
              />
              <input
                type="number"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                placeholder="Price"
                value={video.price}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <input
                type="number"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                placeholder="Stock"
                value={video.stock}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    stock: parseInt(e.target.value),
                  })
                }
              />
              {updatingVideo && (
                <img
                  style={{
                    width: "30px",
                    display: "grid",
                    placeContent: "center",
                  }}
                  src={loader}
                  alt=""
                />
              )}
              <button disabled={load} onClick={() => updateVid()}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {err.open && <Error err={err} setErr={setErr} />}

      <Nav />
    </>
  );
}

export default Product;
