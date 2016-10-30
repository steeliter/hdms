/**
 * New node file
 */
function getStartPage(lastStartPage,curPage,visPageNum){
	var startPage=lastStartPage;
	if(curPage+2>startPage+visPageNum){
		startPage=curPage-5;
	}	
	return startPage;
}