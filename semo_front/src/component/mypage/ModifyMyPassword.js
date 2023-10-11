import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifyMyPassword = () => {
  const navigate = useNavigate();
  //1
  const token = window.localStorage.getItem("token");
  const [currPw, setCurrPw] = useState("");
  //2
  const [isPwauth, setIsPwauth] = useState(false); //비밀번호 인증을 했는지 안했는지

  //3
  const [memberPw, setMemberPw] = useState(""); //새 비밀번호
  const [memberPwRe, setMemberPwRe] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState(""); //새비밀번호시, 일치하는지 안하는지 메세지

  //현재비밀번호확인
  const pwCheck = () => {
    axios
      .post(
        "/member/pwCheck",
        { memberPw: currPw },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data === 1) {
          setIsPwauth(true);
        } else {
          Swal.fire({
            title: "다시입력해주세요.",
          });
        }
      });
    console.log(currPw);
  };

  //새 비밀번호 체크 메세지
  const pwCheckMsg = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호가 일치하지 않습니다");
    } else {
      setCheckPwMsg("");
    }
  };

  const changePw = () => {
    if (checkPwMsg === "") {
      axios
        .post(
          "/member/updateMember",
          { memberPw: memberPw },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              title: "비밀번호가 수정되었습니다.",
            });
            navigate("/");
          } else {
            Swal.fire("에러가 발생했습니다. 잠시후 다시 시도해주세요");
          }
        })
        .catch((res) => {
          if (res.response.status === 403) {
            navigate("/login");
          }
        });
    } else {
      Swal.fire("입력값을 확인하세요");
    }
  };

  return (
    <div className="my-content-wrap">
      <div className="my-content-title">비밀번호 변경</div>
      <div className="pw-auth">
        {isPwauth ? (
          <>
            <div className="new-pw-input-wrap">
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="memberPw">새 비밀번호</label>
                  <input
                    type="password"
                    data={memberPw}
                    setData={setMemberPw}
                    content="memberPw"
                  />
                </div>
                <div>
                  <label htmlFor="memberPw">새 비밀번호 확인</label>
                  <input
                    type="password"
                    data={memberPwRe}
                    setData={setMemberPwRe}
                    content="memberPwRe"
                    //
                    checkMsg={checkPwMsg}
                    blurEvent={pwCheckMsg}
                  />
                </div>
              </div>
              <div className="check-msg">{checkPwMsg}</div>
              <div className="change-btn-box">
                <button onClick={changePw}>변경하기</button>
              </div>
            </div>
          </>
        ) : (
          <div className="pw-input-wrap">
            <div>
              <label htmlFor="currPw">현재비밀번호</label>
              <input
                value={currPw}
                onChange={(e) => setCurrPw(e.target.value)}
                type="password"
                content="currPw"
              />
              <button onClick={pwCheck}>입력</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyMyPassword;