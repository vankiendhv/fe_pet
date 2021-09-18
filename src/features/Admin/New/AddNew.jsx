import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import newApi from "../../../api/newApi";
import tagApi from "../../../api/tagApi";
import { storage } from "../../../firebase";
import "../../../sass/Admin/PublicAdmin.scss";
import Toastify from "toastify-js";
import Select from "react-select";
import Spinner from "../Spin/Spinner";
import { camera } from "../svg/IconSvg";
import { checkArrayEquar } from "../../../function";
import tagNewApi from "../../../api/tagNewApi";
export default function AddNew() {
  const [state, setState] = useState({
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
    tagId: "",
    tagDefault: [],
    loadSpin: false,
  });
  const { linkImg, nameImg, img, tagId, imgId, tagDefault, loadSpin } = state;
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getApiTag = () => {
    tagApi.getAll({ status: 1 }).then((ok) => {
      setTags(ok.data.rows);
    });
  };
  useEffect(() => {
    if (id) {
      newApi.getOne(id).then((ok) => {
        reset(ok);
        setState({
          ...state,
          tagDefault: ok.Tags,
          imgId: ok.avatar,
        });
        setContent(ok.content);
      });
    }
    getApiTag();
  }, []);
  const history = useHistory();
  const [content, setContent] = useState();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (data.samary.length < 1000 || img.length !== 0) {
      if (id) {
        if (img !== "") {
          await storage.ref(`imagesNews/${img.name}`).put(img);
          const anh = await storage
            .ref("imagesNews")
            .child(img.name)
            .getDownloadURL();
          if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              avatar: anh,
              id: id,
            });
          } else {
            await tagNewApi.deletetagNew(id);
            var data1 = [];
            for (let i = 0; i < tagId.length; i++) {
              let tag = tagId[i];
              data1.push({ newId: id, tagId: tag });
            }
            await tagNewApi.posttagNew(data1);
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              avatar: anh,
              id: id,
            });
          }
        } else {
          if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              id: id,
            });
          } else {
            await tagNewApi.deletetagNew(id);
            var data1 = [];
            for (let i = 0; i < tagId.length; i++) {
              let tag = tagId[i];
              data1.push({ newId: id, tagId: tag });
            }
            await tagNewApi.posttagNew(data1);
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              id: id,
            });
          }
        }
      } else {
        await storage.ref(`imagesNews/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesNews")
          .child(img.name)
          .getDownloadURL();
        var tagnew = [];
        for (let i = 0; i < tagId.length; i++) {
          tagnew.push({ tagId: tagId[i] });
        }
        await newApi.postnew({
          name: data.name,
          samary: data.samary,
          content: content,
          avatar: anh,
          tagnew,
          status: 0,
        });
      }
      history.push("/Admin/New");
    } else {
      Toastify({
        text: "Phần tóm tắt không được vượt quá 1000 ký tự!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #ffd000, #ff8300)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const onchangeTag = (e) => {
    let arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e[i].value);
    }
    setState({ ...state, tagId: arr });
  };
  const formatDataTag = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push({ value: e[i].id, label: e[i].name });
    }
    return arr;
  };
  const formatTagDefault = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e.id);
    }
    return arr;
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Thêm tin tức</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên tin tức</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && (
            <span className="text-danger">Không được bỏ trống</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Ảnh đại diện</label>
          <div className="update">
            <div className="icon-avatar">
              <label htmlFor="avatar">{camera}</label>
              <input
                type="file"
                name=""
                id="avatar"
                hidden
                onChange={hangdelimage}
              />
            </div>
            {linkImg ? (
              <img
                src={linkImg}
                className="img-update"
                height="150px"
                width="250px"
                alt=""
              />
            ) : imgId ? (
              <img
                src={imgId}
                className="img-update"
                height="150px"
                width="250px"
                alt=""
              />
            ) : (
              ""
            )}
            <br />
            <span>{nameImg}</span>
          </div>
        </div>
        <div className="input-admin">
          <label htmlFor="a">Tóm tắt</label>
          <textarea
            id=""
            rows="5"
            {...register("samary", { required: true })}
          ></textarea>
          {errors.samary && (
            <span className="text-danger">Không được bỏ trống</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Tag</label>
          {tags.length === 0 ? (
            <Spinner />
          ) : (
            <Select
              closeMenuOnSelect={false}
              defaultValue={formatDataTag(tagDefault)}
              isMulti
              onChange={onchangeTag}
              options={formatDataTag(tags)}
            />
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Nội dung</label>
          <JoditEditor
            value={content}
            tabIndex={1}
            onChange={(e) => setContent(e)}
          />
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa tin tức" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}