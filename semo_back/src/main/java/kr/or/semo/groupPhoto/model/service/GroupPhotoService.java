package kr.or.semo.groupPhoto.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.groupPhoto.model.dao.GroupPhotoDao;
import kr.or.semo.member.model.dao.MemberDao;

@Service
public class GroupPhotoService {
	@Autowired
	private GroupPhotoDao groupPhotoDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	public Map groupPhotoList(int groupNo, int reqPage) {
		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 10;	//한페이지당 게시물 수
		int pageNaviSize = 5; 	//페이지 네비게이션 길이
		int totalCount = groupPhotoDao.totalCount(); // 전체게시물 수
		//페이징조회 및 페이지네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List groupPhotoList = groupPhotoDao.selectgroupPhotoList(groupNo, pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("groupPhotoList", groupPhotoList);
		map.put("pi", pi);
		return map;
	}

}
