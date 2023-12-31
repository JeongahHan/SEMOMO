import { Avatar, AvatarGroup, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";
import FeedModal from "../util/FeedModal";
import Comment from "../util/Comment";
import MyModal from "../util/MyModal";

const FeedView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const feedNo = location.state.feedNo;
  const [feed, setFeed] = useState({});
  const [member, setMember] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedLikeCount, setFeedLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(0);
  const [memberList, setMemberList] = useState([]);
  const [changeFeed, setChangeFeed] = useState(true);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [commentCount, setCommentCount] = useState(0);
  const [changeFeedComment, setChangeFeedComment] = useState([true]); //피드댓글 새로고침

  useEffect(() => {
    axios
      .get("/feed/view/" + feedNo)
      .then((res) => {
        // console.log(res.data);
        setFeed(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
      axios
        .post(
          "/feed/isLike",
          { feedNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setIsLike(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
    axios
      .get("/feed/getFeedLike/" + feedNo)
      .then((res) => {
        setFeedLikeCount(res.data.feedLikeCount);
        setMemberList(res.data.list);
        // console.log("멤버리스트" + res.data);
        // console.log(memberList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    axios
      .get("/feed/getCommentCount/" + feedNo)
      .then((res) => {
        setCommentCount(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [changeFeed, changeFeedComment, feedLikeCount]);
  const handelClick = () => {
    //모달오픈
    setIsOpen(true);
  };
  const onSubmit = () => {
    // 특정 로직
    setIsOpen(false);
  };
  const onCancel = () => {
    setIsOpen(false);
  };
  const modalClick = () => {
    setIsModalOpen(true);
  };
  const onModalCancel = () => {
    setIsModalOpen(false);
  };
  const deleteFeed = () => {
    Swal.fire({
      icon: "question",
      text: "피드를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/feed/delete/" + feed.feedNo)
          .then((res) => {
            // console.log(res.data);
            if (res.data === 1) {
              navigate("/feed/profile", {
                state: { memberNo: member.memberNo },
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  const loginMsg = () => {
    Swal.fire({ icon: "info", text: "로그인 후 이용해 주세요." });
  };
  const addLike = () => {
    axios
      .post(
        "/feed/addLike",
        { feedNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setFeedLikeCount(res.data);
        setIsLike(1);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  const removeLike = () => {
    axios
      .post(
        "/feed/removeLike",
        { feedNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setFeedLikeCount(res.data);
        setIsLike(0);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  function formatTime(postTime) {
    const currentTime = new Date();
    const postDate = new Date(postTime);

    const timeDifference = (currentTime - postDate) / 1000; // 초 단위로 계산
    const seconds = Math.floor(timeDifference);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더합니다.
    const day = postDate.getDate();
    if (years >= 1) {
      return `${year}년 ${month}월 ${day}일`;
    } else if (weeks >= 1) {
      return `${month}월 ${day}일`;
    } else if (days >= 1) {
      return `${days}일 전`;
    } else if (hours >= 1) {
      return `${hours}시간 전`;
    } else if (minutes >= 1) {
      return `${minutes}분 전`;
    } else if (seconds >= 1) {
      return `${seconds}초 전`;
    } else {
      return "방금";
    }
  }
  const naviFeedProfile = () => {
    navigate("/feed/profile", {
      state: { memberNo: feed.feedWriter },
    });
  };
  return (
    <div className="feed-view-wrap">
      <div className="feed-view-top">
        {feed.memberImg === null ? (
          <div className="feed-view-writerImg">
            <Stack direction="row" spacing={2} onClick={naviFeedProfile}>
              <Avatar
                alt="Remy Sharp"
                src="/image/person.png"
                sx={{ width: 40, height: 40 }}
              />
            </Stack>
          </div>
        ) : (
          <div className="feed-view-writerImg">
            <Stack direction="row" spacing={2} onClick={naviFeedProfile}>
              {feed.memberImg ? (
                <Avatar
                  alt="Remy Sharp"
                  src={"/member/" + feed.memberImg}
                  sx={{ width: 40, height: 40 }}
                />
              ) : (
                ""
              )}
            </Stack>
          </div>
        )}
        <div className="feed-view-writer" onClick={naviFeedProfile}>
          {feed.memberName}
        </div>
        <div className="feed-view-date">
          {feed.feedDate ? formatTime(feed.feedDate) : ""}
        </div>
      </div>
      <div className="feed-view-mid">
        <div className="feed-view-image">
          {feed.feedImg ? <img src={"/feed/" + feed.feedImg} /> : ""}
        </div>
        <div className="feed-view-mid-icon">
          <div className="feed-view-like">
            <div>
              {isLogin ? (
                isLike === 0 ? (
                  <span className="material-icons" onClick={addLike}>
                    favorite_border
                  </span>
                ) : (
                  <span
                    className="material-icons likeicon"
                    onClick={removeLike}
                  >
                    favorite
                  </span>
                )
              ) : (
                <span className="material-icons" onClick={loginMsg}>
                  favorite_border
                </span>
              )}
              {feedLikeCount === 0 ? (
                <span className="feed-count">{feedLikeCount}</span>
              ) : (
                <span className="feed-count" onClick={modalClick}>
                  {feedLikeCount}
                </span>
              )}

              <MyModal
                isModalOpen={isModalOpen}
                onModalCancel={onModalCancel}
                memberList={memberList}
                isLogin={isLogin}
                changeFeed={changeFeed}
                setChangeFeed={setChangeFeed}
              />
            </div>

            <div className="feed-view-commentCount">
              <span className="material-icons">chat_bubble_outline</span>
              <span className="feed-count">{commentCount}</span>
            </div>
          </div>
          {isLogin ? (
            member && member.memberNo === feed.feedWriter ? (
              <div className="feed-view-btn-zone">
                <FeedModal
                  isOpen={isOpen}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                  member={member}
                  feed={feed}
                  changeFeed={changeFeed}
                  setChangeFeed={setChangeFeed}
                  type="modify"
                />
                <span className="material-icons" onClick={handelClick}>
                  mode_edit_outline
                </span>
                <span className="material-icons" onClick={deleteFeed}>
                  delete
                </span>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <div className="feed-view-content">{feed.feedContent}</div>
      </div>
      <div className="feed-view-bottom">
        <Comment
          isLogin={isLogin}
          member={member}
          feedNo={feedNo}
          changeFeedComment={changeFeedComment}
          setChangeFeedComment={setChangeFeedComment}
        />
      </div>
    </div>
  );
};

export default FeedView;
