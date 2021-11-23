import React, { useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../../atom/userState";
import globalModal from "../../atom/globalModal";

const Auth = () => {
  const setUser = useSetRecoilState(userState);
  const setGlobalModal = useSetRecoilState(globalModal);

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/auth/me`)
      .then(response => {
        const { data } = response;
        const nowDate = new Date();
        const expireDate = new Date();
        expireDate.setDate(nowDate.getDate() + 14);
        const newUser = {
          isLogin: true,
          id: data.id,
          userId: data.intra,
          isAdmin: data.librarian,
          imgUrl: data.imageUrl,
          expire: expireDate.toISOString(),
        };
        setUser(newUser);
        window.localStorage.setItem("user", JSON.stringify(newUser));
        window.history.go(-2);
      })
      .catch(error => {
        const message = error.response
          ? error.response.data.message
          : error.message;
        setGlobalModal({
          view: true,
          error: `예상치 못한 오류가 발생했습니다.\nme Error ${message}`,
        });
      });
  }, []);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};
export default Auth;
