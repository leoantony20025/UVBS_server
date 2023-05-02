import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import {
  useAddAudio,
  useDeleteAudio,
  useUpdateAudio,
} from "../graphql/mutation/audio";
import { getAudios } from "../redux/slices/adminSlice";
import "./Video.css";
import Nav from "../components/Nav";
import ReactApexChart from "react-apexcharts";
import loader from "../assets/loader.svg";
import { useGetAllAudios } from "../graphql/query/audio";
import iDelR from "../assets/iDelR.png";
import iEditR from "../assets/iEditR.png";
import iCatW from "../assets/iCatW.png";
import iCloseR from "../assets/iCloseR.png";

function Audio() {
  const [audio, setAudio] = useState({
    open: false,
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    audioUrl: "",
    language: "",
    song: "",
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
    audios: [],
  });
  const { audios } = useSelector((state) => state.admin);
  const [load, setLoading] = useState(false);
  const [displayAudios, setDisplayAudios] = useState([]);
  const dispatch = useDispatch();
  const {
    loading: gettingAudios,
    data: cloudAudios = [],
    error: errorVideos,
  } = useGetAllAudios();
  const { addAudio, loading: addingAudio } = useAddAudio();
  const { updateAudio, loading: updatingAudio } = useUpdateAudio();
  const { deleteAudio, loading: deletingAudio } = useDeleteAudio();

  console.log(audio);

  // DisplaySkills and Error corrections
  useEffect(() => {
    if (cloudAudios?.length !== 0) {
      setDisplayAudios(cloudAudios);
      dispatch(getAudios(cloudAudios));
      setErr({ open: false, msg: "" });
    }
  }, [cloudAudios]);

  useEffect(() => {
    if (audios?.length !== 0) {
      setDisplayAudios(audios);
      setErr({ open: false, msg: "" });
    }
  }, [audios]);

  useEffect(() => {
    if (displayAudios?.length !== 0) {
      setErr({ open: false, msg: "" });
    }
  }, [displayAudios]);

  // Add
  const addNewAudio = async () => {
    if (
      audio.title !== "" &&
      audio.description !== "" &&
      audio.thumbnail !== "" &&
      audio.audioUrl !== "" &&
      audio.language !== "" &&
      audio.song !== ""
    ) {
      let { data } = await addAudio({
        variables: audio,
      });
      if (data?.addAudio?.length !== 0) {
        dispatch(getAudios(data?.addAudio));
        setDisplayAudios(data?.addAudio);
        setAudio({
          open: false,
          id: "",
          title: "",
          description: "",
          thumbnail: "",
          audioUrl: "",
          language: "",
          song: "",
        });
        setAdd({
          open: false,
          title: "",
          description: "",
          thumbnail: "",
          audioUrl: "",
          language: "",
          song: "",
        });
      }
    } else {
      setErr({
        open: true,
        msg: "Enter all the fields!",
      });
    }
  };

  const updateAud = async () => {
    if (
      audio.title !== "" &&
      audio.description !== "" &&
      audio.thumbnail !== "" &&
      audio.audioUrl !== "" &&
      audio.language !== "" &&
      audio.song !== ""
    ) {
      let { data } = await updateAudio({
        variables: audio,
      });
      if (data?.updateAudio?.length !== 0) {
        dispatch(getAudios(data?.updateAudio));
        setDisplayAudios(data?.updateAudio);
        setAudio({
          open: false,
          id: "",
          title: "",
          description: "",
          thumbnail: "",
          audioUrl: "",
          language: "",
          song: "",
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
    const { data } = await deleteAudio({
      variables: { id },
    });
    if (data?.deleteAudio !== 0) {
      setDisplayAudios(data?.deleteAudio);
      setAudio({ open: false, id: "", name: "" });
    } else {
      setErr({
        open: true,
        msg: "Something went wrong!",
      });
    }
  };

  return (
    <>
      {gettingAudios ? (
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
            <p>Audios</p>
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
                  <p>Audio</p>
                  <img
                    onClick={() => setAdd({ open: false })}
                    src={iCloseR}
                    alt=""
                  />
                </div>
                <div className="va-body">
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewAudio()}
                    placeholder="Title"
                    value={audio.title}
                    onChange={(e) =>
                      setAudio({ ...audio, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewAudio()}
                    placeholder="Description"
                    value={audio.description}
                    onChange={(e) =>
                      setAudio({ ...audio, description: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewAudio()}
                    placeholder="Thumbnail URL"
                    value={audio.thumbnail}
                    onChange={(e) =>
                      setAudio({ ...audio, thumbnail: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewAudio()}
                    placeholder="Google drive audio ID"
                    value={audio.audioUrl}
                    onChange={(e) =>
                      setAudio({
                        ...audio,
                        audioUrl: `https://docs.google.com/uc?export=download&id=${e.target.value}`,
                      })
                    }
                  />
                  <select
                    onChange={(e) =>
                      setAudio({ ...audio, language: e.target.value })
                    }
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value="TAMIL">Tamil</option>
                    <option value="HINDI">Hindi</option>
                  </select>
                  <select
                    onChange={(e) =>
                      setAudio({ ...audio, song: JSON.parse(e.target.value) })
                    }
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value={true}>Song</option>
                    <option value={false}>Karoke</option>
                  </select>
                  <button disabled={addingAudio} onClick={() => addNewAudio()}>
                    Add Audio
                  </button>
                </div>
                {addingAudio && (
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

          {gettingAudios ? (
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
          ) : displayAudios.length !== 0 ? (
            <div className="v-list">
              {displayAudios.map((c) => (
                <div className="vl-video" key={c?.id}>
                  <img src={c?.thumbnail} alt="" />
                  <div className="vl-body">
                    <div className="vl-cont">
                      <p>{c?.title}</p>
                      <h5 style={{ margin: "10px 0" }}>{c?.description}</h5>
                    </div>
                    <div className="vl-btns">
                      <img
                        onClick={() =>
                          setAudio({
                            open: true,
                            id: c?.id,
                            title: c?.title,
                            description: c?.description,
                            thumbnail: c?.thumbnail,
                            audioUrl: c?.audioUrl,
                            language: c?.language,
                            song: c?.song,
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
              {deletingAudio && (
                <img style={{ width: "40px" }} src={loader} alt="" />
              )}
            </div>
          ) : (
            <p style={{ color: "red", marginTop: "30px" }}>No records found!</p>
          )}
        </div>
      )}

      {audio.open && (
        <div className="add">
          <div className="v-add">
            <div className="va-head">
              <p>Audio</p>
              <img
                onClick={() =>
                  setAudio({
                    open: false,
                    id: "",
                    title: "",
                    description: "",
                    thumbnail: "",
                    audioUrl: "",
                    language: "",
                    song: "",
                  })
                }
                src="https://img.icons8.com/ios/48/fc3737/delete-sign--v1.png"
                alt=""
              />
            </div>
            <div className="va-body">
              <p>{audio.title}</p>
              <input
                type="text"
                placeholder="Title"
                onKeyDown={(e) => e.key === "Enter" && updateAud()}
                value={audio.title}
                onChange={(e) => setAudio({ ...audio, title: e.target.value })}
              />
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && updateAud()}
                placeholder="Description"
                value={audio.description}
                onChange={(e) =>
                  setAudio({ ...audio, description: e.target.value })
                }
              />
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && updateAud()}
                placeholder="Thumbnail URL"
                value={audio.thumbnail}
                onChange={(e) =>
                  setAudio({ ...audio, thumbnail: e.target.value })
                }
              />
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && updateAud()}
                placeholder="Google drive audio ID"
                value={audio.audioUrl}
                onChange={(e) =>
                  setAudio({
                    ...audio,
                    audioUrl: e.target.value,
                  })
                }
              />
              <select
                value={audio.language}
                onChange={(e) =>
                  setAudio({ ...audio, language: e.target.value })
                }
              >
                <option selected disabled>
                  Select
                </option>
                <option value="TAMIL">Tamil</option>
                <option value="HINDI">Hindi</option>
              </select>
              <select
                value={audio.song}
                onChange={(e) =>
                  setAudio({ ...audio, song: JSON.parse(e.target.value) })
                }
              >
                <option selected disabled>
                  Select
                </option>
                <option value={true}>Song</option>
                <option value={false}>Karoke</option>
              </select>
              {addingAudio && (
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
              <button disabled={load} onClick={() => updateAud()}>
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

export default Audio;
