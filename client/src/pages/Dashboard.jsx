import React, { useState } from "react";
import "./Dashboard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import ReactApexChart from "react-apexcharts";
import {
  getAudios,
  getOrders,
  getProducts,
  getUsers,
  getVideos,
} from "../redux/slices/adminSlice";
import loader from "../assets/loader.svg";
import { format } from "date-fns";
import iSkillOR from "../assets/iSkillOR.png";
import iSkillR from "../assets/iSkillR.png";
import iCatR from "../assets/iCatR.png";
import iCertR from "../assets/iCertR.png";
import iEmpsR from "../assets/iEmpsR.png";
import iForR from "../assets/iForR.png";
import { useGetAllUsers } from "../graphql/query/user";
import { useGetAllProducts } from "../graphql/query/product";
import { useGetAllVideos } from "../graphql/query/video";
import { useGetAllAudios } from "../graphql/query/audio";

function Dashboard() {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoading] = useState(false);
  const { loading: gettingUsers, data: users = [] } = useGetAllUsers();
  const { loading: gettingAudios, data: audios = [] } = useGetAllAudios();
  const { loading: gettingVideos, data: videos = [] } = useGetAllVideos();
  const { loading: gettingProducts, data: products = [] } = useGetAllProducts();

  console.log(users);

  useEffect(() => {
    if (admin.users.length === 0) {
      dispatch(getUsers(users));
    }
    if (admin.audios.length === 0) {
      dispatch(getAudios(audios));
    }
    if (admin.videos.length === 0) {
      dispatch(getVideos(videos));
    }
    if (admin.products.length === 0) {
      dispatch(getProducts(products));
    }
    console.log("done", admin);
  }, [gettingAudios, gettingProducts, gettingVideos, gettingUsers]);

  const getDate = (date) => {
    let dateObj = format(new Date(date), "d MMM yyyy");
    console.log(dateObj);
    return dateObj.toString();
  };

  const chartData = {
    series: [
      {
        name: "Skills",
        data: [...videos?.slice(0, 5)?.map((v) => v?.likes?.length)],
      },
    ],
    options: {
      chart: {
        type: "area",
        zoom: {
          enabled: true,
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
        text: "Most liked videos",
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
        categories: [...videos?.slice(0, 5)?.map((v) => v?.title)],
        labels: {
          show: true,
          hideOverlappingLabels: true,
        },
      },
      yaxis: {
        min: 1,
        forceNiceScale: true,
        tickAmount: 2,
      },
    },
  };

  // const chartData2 = {
  //   series: [
  //     {
  //       name: "Employees",
  //       data: [
  //         ...skills
  //           ?.slice(0, 5)
  //           ?.map((s, index) => index < 5 && s?.employeeSkills?.length),
  //       ],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "area",
  //       zoom: {
  //         enabled: true,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     title: {
  //       text: "Skills on Employees",
  //       align: "left",
  //       margin: 10,
  //       offsetX: 4,
  //       offsetY: 6,
  //       style: {
  //         fontSize: "10px",
  //         color: "red",
  //         fontWeight: "normal",
  //       },
  //     },
  //     colors: ["#ff8888", "#ffb6b6", "red", "transparent"],
  //     grid: {
  //       show: false,
  //       row: {
  //         opacity: 0,
  //       },
  //     },
  //     xaxis: {
  //       categories: [...skills?.slice(0, 5)?.map((s) => s?.skill?.name)],
  //       labels: {
  //         show: true,
  //         hideOverlappingLabels: true,
  //       },
  //     },
  //     yaxis: {
  //       labels: {
  //         hideOverlappingLabels: true,
  //       },
  //     },
  //   },
  // };

  return (
    <>
      {gettingAudios | gettingProducts | gettingUsers | gettingVideos ? (
        <div
          style={{
            display: "grid",
            placeContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <img src={loader} alt="" />
        </div>
      ) : (
        <div className="dashboard">
          <div className="d-mixed">
            <div className="dm-cont">
              <div>
                <div className="dmc-img">
                  <span></span>
                  <img src={iEmpsR} alt="" />
                </div>
                <div>
                  <p>Users</p>
                  <span className="gt">{users.length}</span>
                </div>
                <Link to={"/users"}>
                  <img src={iForR} alt="" />
                </Link>
              </div>
              <div>
                <div className="dmc-img">
                  <span></span>
                  <img src={iCatR} alt="" />
                </div>
                <div>
                  <p>Videos</p>
                  <span className="gt">{videos.length}</span>
                </div>
                <Link to={"/admin/category"}>
                  <img src={iForR} alt="" />
                </Link>
              </div>
              <div>
                <div className="dmc-img">
                  <span></span>
                  <img src={iSkillR} alt="" />
                </div>
                <div>
                  <p>Audios</p>
                  <span className="gt">{audios.length}</span>
                </div>
                <Link to={"/admin/skill"}>
                  <img src={iForR} alt="" />
                </Link>
              </div>
              <div>
                <div className="dmc-img">
                  <span></span>
                  <img src={iCertR} alt="" />
                </div>
                <div>
                  <p>Products</p>
                  <span className="gt">{products.length}</span>
                </div>
                <Link to={"/admin/certificate"}>
                  <img src={iForR} alt="" />
                </Link>
              </div>
            </div>
          </div>

          <div className="d-cats">
            <div className="d-title">
              <p>Videos</p>
              <span></span>
              <img
                onClick={() => navigate("/admin/skill")}
                src={iForR}
                alt=""
              />
            </div>
            <p style={{ marginTop: "40px", marginLeft: "20px", color: "red" }}>
              Most Liked Videos
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div className="dc-cont">
                {videos ? (
                  videos.map(
                    (s, index) =>
                      index < 5 && (
                        <div key={s?.id} className="sk-body">
                          <img src={iSkillOR} alt="" />
                          <div className="sb-cont">
                            <p>{s?.title}</p>
                            <span>
                              <h6></h6>
                              {getDate(s?.createdAt)}
                            </span>
                          </div>
                          <div className="dc-count">
                            <h6>likes</h6>
                            <span>{s?.likes?.length}</span>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div></div>
                )}
              </div>
              <div className="chart">
                <ReactApexChart
                  width={"100%"}
                  options={chartData.options}
                  series={chartData.series}
                  type="area"
                />
              </div>
            </div>
          </div>

          {/* <div className="d-cats">
            <div className="d-title">
              <p>Categories</p>
              <span></span>
              <img
                onClick={() => navigate("/admin/category")}
                src={iForR}
                alt=""
              />
            </div>
            <p style={{ marginTop: "40px", marginLeft: "20px", color: "red" }}>
              Categories on Skills
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div className="contents dc-cont">
                {categories ? (
                  categories.map(
                    (c, index) =>
                      index < 5 && (
                        <div key={c?.id}>
                          <img src={iCatOR} alt="" />
                          <p>{c?.name}</p>
                          <div className="dc-count">
                            <h6>skills</h6>
                            <span>{c?.skills?.length}</span>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div></div>
                )}
              </div>
              <div className="chart">
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="area"
                  width={"100%"}
                  height={150}
                />
              </div>
            </div>
          </div> */}
        </div>
      )}
      <Nav />
    </>
  );
}

export default Dashboard;
