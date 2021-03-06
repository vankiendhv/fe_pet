import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useEffect, useState } from "react";
import "../../../sass/Home/Payment.scss";
import Slide from "@material-ui/core/Slide";
import { DialogContentText } from "@material-ui/core";
import billApi from "../../../api/billApi";
import { messageShowSuccess } from "../../../function";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../app/Slice/CartSlide";
import productApi from "../../../api/productApi";
import petApi from "../../../api/petApi";
export default function Payment({
  onClose,
  statusDialog,
  userInfor,
  listCart,
}) {
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  console.log(listCart);
  const handleClose = () => {
    onClose();
  };

  const handleClosePopConfirm = () => {
    setOpenPopconfirm(false);
  };

  const handleGetResult = () => {
    let result = 0;
    listCart.forEach((el) => {
      result += el.priceResult;
    });
    return Number(result).toLocaleString();
  };

  const handleAgree = () => {
    setOpenPopconfirm(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const dispatch = useDispatch();

  const handleAgreePopConfirm = () => {
    setOpenPopconfirm(false);
    onClose();
    billApi
      .postbill({
        userName: userInfor.firstName + " " + userInfor.lastName,
        address: userInfor.address,
        phone: userInfor.phone,
        listProduct: JSON.stringify(listCart),
        price: userInfor.price,
      })
      .then((ok) => {
        let quantityProduct = [];
        let quantityPet = [];
        listCart.forEach((el) => {
          if (!el.type) {
            quantityProduct.push({
              id: el.id,
              quantity: el.quantity - el.quantityCurrent,
              avatar: el.avatar,
            });
          } else {
            quantityPet.push({
              id: el.id,
              checkAdmin: el.checkAdmin,
              type: el.type,
              quantity: el.quantity - el.quantityCurrent,
            });
          }
        });
        if (quantityProduct.length !== 0) {
          productApi.updateQuantityProduct(quantityProduct);
        }
        if (quantityPet.length !== 0) {
          petApi.updateQuantityPet(quantityPet);
        }

        dispatch(resetCart());
        messageShowSuccess("L??n ????n th??nh c??ng b???n s??? ???????c li??n h??? s???m!");
      });
  };

  return (
    <div className="payment">
      <Dialog
        open={statusDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thanh to??n</DialogTitle>
        <DialogContent>
          <div className="infor">
            <div className="infor_title">Th??ng tin s???n ph???m</div>
            <div className="infor_content">
              {listCart?.map((ok, index) => (
                <div className="box" key={index}>
                  <div className="box_title">
                    {index + 1}. {ok.name}
                  </div>
                  <div className="box_content">
                    <div className="item">S??? l?????ng: {ok.quantityCurrent}</div>
                    <div className="item">
                      Gi??: {Number(ok.priceResult).toLocaleString()} vn??
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="result">Th??nh ti???n: {handleGetResult()}vn??</div>
          <form>
            <div className="input-admin">
              <label htmlFor="">?????a ch???</label>
              <input type="text" value={userInfor.address} readOnly />
            </div>
            <div className="input-admin">
              <label htmlFor="">??i???n tho???i</label>
              <input type="text" value={userInfor.phone} readOnly />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hu???
          </Button>
          <Button id="hello" onClick={handleAgree} color="secondary">
            ?????ng ??
          </Button>
        </DialogActions>
        <Dialog
          open={openPopconfirm}
          TransitionComponent={Transition}
          keepMounted
          className="popConfirm-dialog"
          onClose={handleClosePopConfirm}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Th??ng b??o</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              B???n ?????ng ?? ti???p t???c ti???n h??nh giao d???ch? B???n kh??ng th??? hu??? giao
              d???ch khi ???? b???m ti???p t???c.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopConfirm} color="primary">
              Hu??? b???
            </Button>
            <Button onClick={handleAgreePopConfirm} color="secondary">
              Ti???p t???c
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </div>
  );
}
