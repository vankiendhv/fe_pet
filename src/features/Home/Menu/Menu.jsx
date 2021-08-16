import React from "react";
import { Link } from "react-router-dom";
import "../../../sass/Home/Menu.scss";
import "./menu";
import imgCat from "../../../images/cat1.jpg";
export default function Menu() {
  return (
    <div className="Menu ">
      <div className="menu-logo">
        <div className="logo">my pet</div>
      </div>
      <div className="menu-bar">
        <div className="icon-bar">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="bars"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-bars fa-w-14 fa-3x"
          >
            <path
              fill="currentColor"
              d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
              className=""
            ></path>
          </svg>
        </div>
      </div>
      <div id="menu-hide" style={{ display: "flex" }}>
        <div className="menu-item">
          <div className="list-item">
            <ul>
              <li className="item">
                <Link>Trang chủ</Link>
              </li>
              <li className="item">
                <Link>Dịch vụ</Link>
              </li>
              <li className="item">
                <Link>Giới thiệu</Link>
              </li>
              <li className="item">
                <Link>Tin tức</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu-account">
          <div className="search">
            <input type="text" name="" placeholder="Tìm kiếm" id="" />
            <div className="icon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-search fa-w-16 fa-3x"
              >
                <path
                  fill="currentColor"
                  d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"
                  className=""
                ></path>
              </svg>
            </div>
          </div>
          <div className="avatar">
            <img src={imgCat} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}