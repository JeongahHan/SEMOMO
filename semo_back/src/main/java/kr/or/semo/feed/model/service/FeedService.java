package kr.or.semo.feed.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.feed.model.dao.FeedDao;
import kr.or.semo.feed.model.vo.Feed;
import kr.or.semo.feed.model.vo.FeedComment;
import kr.or.semo.feed.model.vo.FeedCommentLike;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;

@Service
public class FeedService {
	@Autowired
	private FeedDao feedDao;
	@Autowired
	private MemberDao memberDao;

	public Member selectOneMember(int memberNo) {
		// TODO Auto-generated method stub
		return memberDao.selectMember(memberNo);
	}
	//피드 작성
	@Transactional
	public int insertFeed(Feed f) {
		Member member = memberDao.selectOneMember(f.getMemberId());
		f.setFeedWriter(member.getMemberNo());
		int result = feedDao.insertFeed(f);
		return result;
	}

	public List selectFeedList(int feedWriter) {
		List feedList = feedDao.selectFeedList(feedWriter);
		return feedList;
	}

	public Feed selectOneFeed(int feedNo) {
		// TODO Auto-generated method stub
		return feedDao.selectOneFeed(feedNo);
	}
	@Transactional
	public int modifyFeed(Feed f) {
		// TODO Auto-generated method stub
		return feedDao.updateFeed(f);
	}
	@Transactional
	public String delete(int feedNo) {
		Feed f = feedDao.selectOneFeed(feedNo);
		String feedImg = f.getFeedImg();
		int result = feedDao.deleteFeed(feedNo);
		if(result>0) {
			return feedImg;
		}
		return null;
	}

	public Map getFeedLike(int feedNo) {
		int feedLikeCount = feedDao.feedLikeCount(feedNo);
		List feedLikeList = feedDao.getFeedLike(feedNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", feedLikeList);
		map.put("feedLikeCount", feedLikeCount);
		return map;
	}

	public int getIsLike(int feedNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int memberNo = member.getMemberNo();
		return feedDao.getIsLike(feedNo, memberNo);
	}
	@Transactional
	public int insertFeedLike(int feedNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int memberNo = member.getMemberNo();
		int result = feedDao.insertFeedLike(feedNo, memberNo);
		int likeCount = feedDao.feedLikeCount(feedNo);
		return likeCount;
	}
	@Transactional
	public int deleteFeedLike(int feedNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int memberNo = member.getMemberNo();
		int result = feedDao.deleteFeedLike(feedNo, memberNo);
		int likeCount = feedDao.feedLikeCount(feedNo);
		return likeCount;
	}
	@Transactional
	public int insertComment(FeedComment fc, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		fc.setFeedCommentWriter(member.getMemberNo());
		String feedCommentRef = fc.getFeedCommentNo2()==0?null:String.valueOf(fc.getFeedCommentNo2());
		fc.setFeedCommentRef(feedCommentRef);
		return feedDao.insertComment(fc);
	}
	public List feedCommentList(int feedNo) {
		// TODO Auto-generated method stub
		return feedDao.feedCommentList(feedNo);
	}
	@Transactional
	public int deleteComment(int feedCommentNo) {
		// TODO Auto-generated method stub
		return feedDao.deleteComment(feedCommentNo);
	}
	@Transactional
	public int modifyComment(int feedCommentNo, String feedCommentContent) {
		FeedComment fc = new FeedComment();
		fc.setFeedCommentContent(feedCommentContent);
		fc.setFeedCommentNo(feedCommentNo);
		return feedDao.modifyComment(fc);
	}
	public List feedReCommentList(int feedNo) {
		// TODO Auto-generated method stub
		return feedDao.feedReCommentList(feedNo);
	}
	public int getCommentCount(int feedNo) {
		// TODO Auto-generated method stub
		return feedDao.getCommentCount(feedNo);
	}
	public int feedCount(int feedWriter) {
		return feedDao.feedCount(feedWriter);
	}
	public List selectGroupList(int memberNo) {
		return feedDao.selectGroupList(memberNo);
	}
	@Transactional
	public int commentLike(int feedCommentNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		FeedCommentLike feedCommentLike = feedDao.selectOneCommentLike(feedCommentNo, member.getMemberNo());
		if(feedCommentLike != null) {
			feedDao.deleteCommentLike(feedCommentNo, member.getMemberNo());
			return 0;
		}else {
			feedDao.insertCommentLike(feedCommentNo, member.getMemberNo());
			return 1;
		}
	}
	public int commentLikeCount(int feedCommentNo) {
		return feedDao.commentLikeCount(feedCommentNo);
	}
	public int commentLikeState(int feedCommentNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		return feedDao.commentLikeState(feedCommentNo, member.getMemberNo());
	}
	

}
