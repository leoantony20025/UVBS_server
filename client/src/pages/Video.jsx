import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import {
  useAddVideo,
  useDeleteVideo,
  useUpdateVideo,
} from "../graphql/mutation/video";
import { getVideos } from "../redux/slices/adminSlice";
import "./Video.css";
import Nav from "../components/Nav";
import ReactApexChart from "react-apexcharts";
import loader from "../assets/loader.svg";
import { useGetAllVideos } from "../graphql/query/video";
import iDelR from "../assets/iDelR.png";
import iEditR from "../assets/iEditR.png";
import iCatW from "../assets/iCatW.png";
import iCloseR from "../assets/iCloseR.png";

function Video() {
  const [video, setVideo] = useState({
    open: false,
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });
  const [add, setAdd] = useState({
    open: false,
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });
  const [err, setErr] = useState({
    open: false,
    msg: "",
  });
  const [search, setSearch] = useState({
    word: "",
    videos: [],
  });
  const { videos } = useSelector((state) => state.admin);
  const [load, setLoading] = useState(false);
  const [displayVideos, setDisplayVideos] = useState([]);
  const dispatch = useDispatch();
  const {
    loading: gettingVideos,
    data: cloudVideos = [],
    error: errorVideos,
  } = useGetAllVideos();
  const { addVideo, loading: addingVideo } = useAddVideo();
  const { updateVideo, loading: updatingVideo } = useUpdateVideo();
  const { deleteVideo, loading: deletingVideo } = useDeleteVideo();

  console.log(videos);

  // DisplaySkills and Error corrections
  useEffect(() => {
    if (cloudVideos?.length !== 0) {
      setDisplayVideos(cloudVideos);
      dispatch(getVideos(cloudVideos));
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
      video.title !== "" &&
      video.description !== "" &&
      video.thumbnail !== "" &&
      video.videoUrl !== ""
    ) {
      let { data } = await addVideo({
        variables: video,
      });
      if (data?.addVideo?.length !== 0) {
        dispatch(getVideos(data?.addVideo));
        setDisplayVideos(data?.addVideo);
        setVideo({
          open: false,
          id: "",
          title: "",
          description: "",
          thumbnail: "",
          videoUrl: "",
        });
        setAdd({
          open: false,
          title: "",
          description: "",
          thumbnail: "",
          videoUrl: "",
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
      video.title !== "" &&
      video.description !== "" &&
      video.thumbnail !== "" &&
      video.videoUrl !== ""
    ) {
      let { data } = await updateVideo({
        variables: video,
      });
      if (data?.updateVideo?.length !== 0) {
        dispatch(getVideos(data?.updateVideo));
        setDisplayVideos(data?.updateVideo);
        setVideo({
          open: false,
          id: "",
          title: "",
          description: "",
          thumbnail: "",
          videoUrl: "",
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
    const { data } = await deleteVideo({
      variables: { id },
    });
    if (data?.deleteVideo !== 0) {
      setDisplayVideos(data?.deleteVideo);
      setVideo({ open: false, id: "", name: "" });
    } else {
      setErr({
        open: true,
        msg: "Something went wrong!",
      });
    }
  };

  // Search
  // const searchCategory = async () => {
  //   if (search.word !== "") {
  //     const { data } = await searchCategories({
  //       variables: { word: search.word },
  //     });
  //     if (searchingCategory) setLoading(true);
  //     if (data?.searchCategory?.length === 0) {
  //       setLoading(false);
  //       setDisplayVideos([]);
  //     } else {
  //       setLoading(false);
  //       setSearch({ ...search, categories: data?.searchCategory });
  //     }
  //   } else {
  //     setErr({
  //       open: true,
  //       msg: "Enter search field!",
  //     });
  //   }
  // };

  // // Ascending
  // const ascendingCategory = async () => {
  //   let categories = [...displayVideos];
  //   let ascCategories = categories.sort((a, b) =>
  //     a?.name > b?.name ? 1 : b?.name > a?.name ? -1 : 0
  //   );
  //   setDisplayVideos(ascCategories);
  // };

  // // Descending
  // const descendingCategory = async () => {
  //   let categories = [...displayVideos];
  //   let descCategories = categories.sort((a, b) =>
  //     a?.name < b?.name ? 1 : b?.name < a?.name ? -1 : 0
  //   );
  //   setDisplayVideos(descCategories);
  // };

  const chartData = {
    series: [
      {
        name: "Skills",
        data: [...displayVideos?.map((c) => c?.likes?.length)],
      },
    ],
    options: {
      chart: {
        height: 150,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      background: "white",

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Most Liked Videos",
        align: "left",
        margin: 10,
        offsetX: 4,
        offsetY: 6,
        style: {
          fontSize: "10px",
          color: "red",
          fontWeight: "normal",
        },
      },
      colors: ["#ff8888", "#ffb6b6", "red", "transparent"],
      grid: {
        show: false,
        row: {
          opacity: 0,
        },
      },
      xaxis: {
        categories: [...displayVideos?.map((c) => c?.title)],
        labels: {
          hideOverlappingLabels: true,
        },
      },
      yaxis: {
        min: 1,
        forceNiceScale: true,
        tickAmount: 2,
        labels: {
          hideOverlappingLabels: true,
        },
      },
    },
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
            <p>Videos</p>
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
                    placeholder="Title"
                    value={video.title}
                    onChange={(e) =>
                      setVideo({ ...video, title: e.target.value })
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
                    placeholder="Thumbnail URL"
                    value={video.thumbnail}
                    onChange={(e) =>
                      setVideo({ ...video, thumbnail: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    onKeyDown={(e) => e.key === "Enter" && addNewVideo()}
                    placeholder="Google drive Video ID"
                    value={video.videoUrl}
                    onChange={(e) =>
                      setVideo({
                        ...video,
                        videoUrl: `https://drive.google.com/uc?export=download&id=${e.target.value}`,
                      })
                    }
                  />
                  <button disabled={addingVideo} onClick={() => addNewVideo()}>
                    Add Video
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

          {/* <div className="search">
            <div className="sh-body">
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && searchCategory()}
                placeholder="Search Categories..."
                value={search.word}
                onChange={(e) => setSearch({ ...search, word: e.target.value })}
                required
              />
              <img
                onClick={() => searchCategory()}
                src="https://img.icons8.com/ios-glyphs/30/fc3737/search.png"
                alt=""
              />
            </div>
            <div className="sh-filter">
              <img
                src="https://img.icons8.com/fluency-systems-regular/48/null/empty-filter.png"
                alt=""
              />
              <span style={{ marginLeft: "-10px" }}>Filter: </span>
              <p
                onClick={() => {
                  setSearch({ ...search, word: "", categories: [] });
                  setDisplayVideos(categories);
                }}
                style={
                  displayVideos === categories
                    ? { backgroundColor: "red", color: "white" }
                    : {}
                }
              >
                All
              </p>
              <img
                onClick={() => ascendingCategory()}
                src="https://img.icons8.com/fluency-systems-regular/48/fc3737/sort-alpha-up.png"
                alt=""
              />
              <img
                onClick={() => descendingCategory()}
                src="https://img.icons8.com/fluency-systems-regular/48/fc3737/alphabetical-sorting-2.png"
                alt=""
              />
            </div>
          </div> */}

          {/* {gettingVideos && (
            <img style={{ width: "40px" }} src={loader} alt="" />
          )} */}

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
                  <img src={c?.thumbnail} alt="" />
                  <div className="vl-body">
                    <div className="vl-cont">
                      <p>{c?.title}</p>
                      <h5 style={{ margin: "10px 0" }}>{c?.description}</h5>
                    </div>
                    <div className="vl-btns">
                      <img
                        onClick={() =>
                          setVideo({
                            open: true,
                            id: c?.id,
                            title: c?.title,
                            description: c?.description,
                            thumbnail: c?.thumbnail,
                            videoUrl: c?.videoUrl,
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
              {/* <div
                style={{ width: "70vw", margin: "30px 0" }}
                className="chart"
              >
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="area"
                  height={150}
                />
              </div> */}
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
                    title: "",
                    description: "",
                    thumbnail: "",
                    videoUrl: "",
                  })
                }
                src="https://img.icons8.com/ios/48/fc3737/delete-sign--v1.png"
                alt=""
              />
            </div>
            <div className="va-body">
              <p>{video.title}</p>
              <input
                type="text"
                placeholder="Title"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                value={video.title}
                onChange={(e) => setVideo({ ...video, title: e.target.value })}
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
                placeholder="Thumbnail URL"
                value={video.thumbnail}
                onChange={(e) =>
                  setVideo({ ...video, thumbnail: e.target.value })
                }
              />
              <input
                type="text"
                onKeyDown={(e) => e.key === "Enter" && updateVid()}
                placeholder="Google drive Video ID"
                value={video.videoUrl}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    videoUrl: e.target.value,
                  })
                }
              />
              {addingVideo && (
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

export default Video;
