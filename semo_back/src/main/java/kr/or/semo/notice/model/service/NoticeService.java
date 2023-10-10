package kr.or.semo.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;
import kr.or.semo.notice.model.dao.NoticeDao;
import kr.or.semo.notice.model.vo.Notice;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	public Map noticeList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = noticeDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List noticeList = noticeDao.selectNoticeList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("noticeList", noticeList);
		map.put("pi", pi);
		return map;
	}

	public Notice selectOneNotice(int noticeNo) {
		Notice n = noticeDao.selectOneNotice(noticeNo);
		return n;
	}

	@Transactional
	public int insertNotice(Notice n) {
		System.out.println(n);
		Member member = memberDao.selectOneMember(n.getMemberId());
		
		return 0;
	}
}
