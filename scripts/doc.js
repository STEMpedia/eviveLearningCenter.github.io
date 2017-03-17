angular.module('gist', []);

angular.module('gist')
  .directive('gist', ['$timeout', function ($timeout)  {
    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        $timeout(function(){
          var gistId = attrs.id;
          var iframe = document.createElement('iframe');
          iframe.setAttribute('width', '100%');
          iframe.setAttribute('frameborder', '0');
          iframe.id = "gist-" + gistId;
          element[0].appendChild(iframe);

          var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style>' +
            '<style> @media (max-width: 600px) { body { margin: 0px } .gist { width: ' + element[0].clientWidth + 'px; } }</style>' +
            '</head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height='+
            'document.body.scrollHeight + \'px\'"><script type="text/javascript">' +
            '!function(){"use strict";window.retargetLinks=function(){ var gists=' +
            'document.getElementsByClassName("gist");for(var i=0,links;i<gists.length;i++){' +
            'links=gists[i].getElementsByTagName("a");for(var j=0;j<links.length;j++){ ' + 
            'links[j].setAttribute("target","_blank");}}}}();</script><script type="text/javascript" ' +
            'src="https://gist.github.com/' + gistId + '.js" onload="retargetLinks()"></script></body></html>';
          var doc = iframe.document;
          if (iframe.contentDocument) 
            doc = iframe.contentDocument;
          else if (iframe.contentWindow) 
            doc = iframe.contentWindow.document;
        
          doc.open();
          doc.writeln(iframeHtml);
          doc.close();
        },0);
      }
    };
  }]); 
var app = angular.module("learnEviveApp", ["ngRoute",'gist']);
app.config(function($routeProvider, $locationProvider) {
	var documentationViewConfig = {
		templateUrl: './views/doc.html',
		controller: 'documentationCtrl',
	}
    $routeProvider
    .when("/", documentationViewConfig )
    .when("/index.html", documentationViewConfig )
    .otherwise({redirectTo:'/index.html'})

    $locationProvider.html5Mode({
    	enabled: true,
    	requireBase: false})
    .hashPrefix('*');
});
app.controller('documentationCtrl',function($scope, $routeParams){
	window.scrollTo(0,0);
	$scope.navbar = {url:'./templates/navbar.html'};
	$scope.sidebar = {url:'./templates/sidebar.html'};
	$scope.footer = {url:'./templates/footer.html'};
	$scope.sidebarClicked = 0;
	var pageId = $routeParams.t;
	var completeData = window.pageInfo;
	$scope.selectedInSidebar2 = null;
	$scope.selectedInSidebar3 = null;
	
	$scope.pageInfo = {};
	for(var i=0;i < completeData.length;i++){
		if(completeData[i].id==pageId){
			$scope.pageInfo = completeData[i];
			break;
		}

		if(i==completeData.length-1){
			$scope.pageInfo = {
				id:'home',
				templateUrl:'views/home.html',
				sidebar:false,
			}
			$scope.homeData = window.homeData;
			$scope.Tutorials = window.Tutorials;
		}
	}

	for(var i = 0; i < window.sidebarInfo.length; i++){
		var xi = window.sidebarInfo[i];
		if(xi.children){
			for(var j = 0; j < xi.children.length; j++){
				var xj = xi.children[j];
				if(xj.children){
					for(var k = 0; k < xj.children.length; k++){
						var xk = xj.children[k];
						if(xk.href.search('='+pageId) > -1 ){
							$scope.selectedInSidebar2 = xj;
							$scope.selectedInSidebar3 = xk;
							$scope.sidebarClicked = xj;
							break;
						}
					}
				}
			}
		}
	}

	$scope.selectSomething = function(e){
		if($scope.sidebarClicked==e){
			$scope.sidebarClicked = 0;
		}else{
			$scope.sidebarClicked=e;
		}
	}
	$scope.sidebarInfo = window.sidebarInfo;

});