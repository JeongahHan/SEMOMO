import { useLocation, useNavigate } from "react-router-dom";
import "./notice.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button2 } from "../util/Buttons";

const NoticeView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  //console.log(location.state);
  const [notice, setNotice] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state != null) {
      const noticeNo = location.state.noticeNo;
      axios
        .get("/notice/view/" + noticeNo)
        .then((res) => {
          //console.log(res.data);
          setNotice(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        title: "잘못된 접근 경로입니다.",
        text: "공지사항 목록으로 이동합니다.",
        icon: "info",
      }).then(() => {
        navigate("/notice");
      });
    }
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMember(res.data);
          //console.log(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  const modify = () => {
    navigate("/notice/modify", { state: { notice: notice } });
  };
  const deleteNotice = () => {
    Swal.fire({
      icon: "warning",
      text: "공지사항을 삭제하겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/notice/delete/" + notice.noticeNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              Swal.fire({
                icon: "success",
                text: "공지사항이 삭제되었습니다.",
              });
              navigate("/notice"); //성공 시 noticeList로 이동
            }
          })
          .catch((res) => {
            console.log(res.response.status);
            Swal.fire("잠시 후 다시 시도해주세요.");
          });
      }
    });
  };
  return (
    <div className="notice-view-wrap">
      <div className="notice-view-title">{notice.noticeTitle}</div>
      <div className="notice-view-info">
        <span>{notice.memberId}</span>
        <span>{notice.noticeDate}</span>
      </div>
      <div
        className="notice-view-content"
        dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
      ></div>
      <div className="notice-view-btn-zone">
        {isLogin ? (
          member && member.memberNo === notice.memberNo ? (
            <>
              <Button2 text="수정" clickEvent={modify} />
              <Button2 text="삭제" clickEvent={deleteNotice} />
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NoticeView;
