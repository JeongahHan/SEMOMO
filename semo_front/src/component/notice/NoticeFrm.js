import "./notice.css";
import Input from "../util/InputFrm";
import NoticeTextEditor from "../util/NoticeTextEditor";
import { Button2 } from "../util/Buttons";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;

  const buttonEvent = props.buttonEvent;
  const type = props.type;

  return (
    <div className="notice-frm-wrap">
      <table className="notice-tbl">
        <tbody>
          <tr>
            <td>
              <label htmlFor="noticeTitle">제목</label>
            </td>
            <td>
              <Input
                type="text"
                data={noticeTitle}
                setData={setNoticeTitle}
                content="noticeTitle" //상단 라벨과 연결
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <textarea
                onChange={(e) => {
                  const changeValue = e.currentTarget.value;
                  setNoticeContent(changeValue);
                }}
              >
                {noticeContent}
              </textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="notice-content-box">
        <NoticeTextEditor data={noticeContent} setData={setNoticeContent} />
      </div>
      <div className="notice-btn-box">
        {type === "modify" ? (
          <Button2 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button2 text="작성하기" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

export default NoticeFrm;
