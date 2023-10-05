package kr.or.semo.page.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.page.model.dao.PageDao;

@Service
public class PageService {
	@Autowired
	private PageDao pageDao;
	@Autowired
	private Pagination pagination;
	
	public Map pageList(int reqPage) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = pageDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List pageList = pageDao.selectPageList(pi);
		System.out.println(pageList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pageList", pageList);
		map.put("pi", pi);
		return map;
	}
	

}