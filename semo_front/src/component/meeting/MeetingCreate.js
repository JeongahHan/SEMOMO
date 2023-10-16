import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./meeting.css";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Input from "../util/InputFrm";
import Postcode from "../util/PostCode";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MeetingCreate = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const [meetingName, setMeetingName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [meetingPrice, setMeetingPrice] = useState("");
  const [meetingMaxnum, setMeetingMaxnum] = useState("");
  const location = useLocation();
  const groupNo = location.state.groupNo;
  const navigate = useNavigate();
  const createMeeting = () => {
    const meeting = {
      meetingName,
      meetingDate,
      meetingPlace,
      meetingPrice,
      meetingMaxnum,
      groupNo,
    };
    // if문을 위해 값이 무조건 들어가야 하는 값만 넣음
    const notNullData = [meetingName, meetingDate, meetingPlace, meetingMaxnum];

    const token = window.localStorage.getItem("token");
    if (notNullData.every((data) => data != null && data != "")) {
      axios
        .post("create", meeting, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log(res);
          //console.log(res.config.data);
          if (res.data > 0) {
            navigate("/group/view" + groupNo);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값을 확인해주세요!");
    }
  };

  //날짜
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <div className="meeting-wrap">
      <h2 className="meeting-title">정모 생성</h2>
      <div className="meeting-name">
        <MeetingInputWrap
          data={meetingName}
          setData={setMeetingName}
          type="type"
          content="meetingName"
          label="모임 이름"
        />
      </div>
      <div className="meeting-date">
        <div className="meeting-label">
          <label>모임 날짜</label>
        </div>
        <DatePicker
          showTimeSelect
          locale={ko}
          dateFormat="yyyy년 MM월 dd일 aa hh:mm "
          showPopperArrow={false} // 화살표 변경
          selected={meetingDate}
          minDate={new Date()}
          placeholderText="날짜를 선택해주세요"
          timeClassName={handleColor}
          onChange={(date) => setMeetingDate(date)}
        />
      </div>
      <div>
        <Postcode
          data={meetingPlace}
          setData={setMeetingPlace}
          type="type"
          content="meetingPlace"
          label="장소"
        />
      </div>
      <div>
        <MeetingInputWrap
          data={meetingPrice}
          setData={setMeetingPrice}
          type="type"
          content="meetingPrice"
          label="금액"
        />
      </div>
      <div className="meeting-input">
        <MeetingInputWrap
          data={meetingMaxnum}
          setData={setMeetingMaxnum}
          type="number"
          content="meetingMaxnum"
          label="정원"
        />
      </div>
      <div id="meeting-btn">
        <Button1 text="모임 생성" clickEvent={createMeeting}></Button1>
      </div>
    </div>
  );
};

const MeetingInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  return (
    <div className="join-input-wrap">
      <div>
        <div className="meeting-label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};

export default MeetingCreate;
