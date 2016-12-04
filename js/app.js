	 var app = angular.module("test", ["rr","ngRoute"]);
	 app.directive("nav", function() {
		return {
			templateUrl: "template/index2.html"
		}
	})
	 //路由
	  app.config(function($routeProvider){  
		  $routeProvider.when("/aa",{templateUrl:"template/index3.html"});
		  $routeProvider.when("/bb",{templateUrl:"template/index4.html"});
		  $routeProvider.when("/cc",{templateUrl:"template/2.html"});
		  $routeProvider.when("/dd",{templateUrl:"template/1.html"});
		  $routeProvider.otherwise({templateUrl:"template/index3.html"})
		});
	 //把后台返回来的数据展示到前端
	 //如何得到后台返回的数据-------》服务 service   $http是最常见的一种服务
	 app.controller("mainctrl",function($scope,$http){
	 	$http({
	 		method:"get",
	 		url:"php/produch.php"
	 	}).then(function(response){
	 		//成功后的回调函数
	     $scope.data=response.data;
//	     console.log($scope.data)
	      //根据返回数据的条数不同显示相应的页数
	     $scope.getpages = function(){
	        var pages = [];  //存储页数
	        var count = $scope.catproducts.length / 6;
	        for(var i = 0;i<count;i++){
	        	  pages.push(i+1);
	        }
	       $scope.mypages = pages;
	      
	     }
	    
	      //点击分页显示相应的数据
	     $scope.getPerpage = function(perpage){
	     	 $scope.fenyeed = perpage;
	     	var arr = [];   //返回结果，存放每一页的商品
	     	for(var i=(perpage-1)*6;i<Math.min(perpage*6,$scope.catproducts.length);i++){
	     		arr.push($scope.catproducts[i])
	     	}
//	     	console.log(arr)
	     	$scope.myarr = arr;
	     }
	     //点击上一页
	     $scope.perv = function(){
	     	$scope.pervpage  = $scope.fenyeed;
	       	if($scope.pervpage!=1){
	       		$scope.pervpage-=1;
	       		$scope.getPerpage($scope.pervpage)
	       		$(".perv").addClass("btn-primary")
	       	}else{
	       		$(".perv").removeClass("btn-primary")
	       	}
	     }
	     //点击下一页
	     $scope.next = function(){
	     	 $scope.nextpage = $scope.fenyeed;
	     	if($scope.nextpage!==$scope.mypages.length){
	       		$scope.nextpage+=1;
	       		$scope.getPerpage($scope.nextpage)
//	       		console.log($scope.mypages.length)
	       		$(".next").addClass("btn-primary")
	       	}else{
	       		$(".next").removeClass("btn-primary")
	       	}
	     }
	     
	     
	     //点击左边分类，显示相应的商品
	     $scope.getproducts = function(fenlei){
	     	//记录你点击的是哪个分类
	     	$scope.choosed = fenlei
	     	var catproducts = []; //接受返回的数据
	     	if(fenlei=="全部"){
	     		catproducts = $scope.data;
	     	}else{
	     		for(var i = 0; i<$scope.data.length;i++){
	     			if($scope.data[i].category==fenlei){
	     				catproducts.push($scope.data[i])
	     			}
	     		}
	     	}
	     	$scope.catproducts = catproducts;
	     	$scope.getpages(); //调用分页函数
	     	$scope.getPerpage(1); //调用点击分页显示相应数据的函数
	     	
//	     	console.log($scope.catproducts)
            
	     }
	     //自动调用一遍
	     $scope.getproducts("全部");
	     
	     //点击左边按钮添加对应样式
	     $scope.addClass = function(fenlei){
	      
	       return $scope.choosed ==fenlei ? "btn-primary":"";
	     }
	     $scope.fenyeclass = function(perpage){
	      
	       return $scope.fenyeed ==perpage ? "btn-primary":"";
	     }
	    
	    $scope.lostion = function(obj){
	    	  window.location.assign("#/cc?id="+obj.id);
	    }
	    $scope.xiangqing = function(obj){
         
	    }
	    
	    
	    
	    
	      //添加到收藏夹
	    $scope.Mycar = [];  //定义收藏夹
	    $scope.addtomycar = function(obj){
//	    	console.log("ddd")
	    	  var has = false; //定义一个布尔值，判断收藏夹里面有没有该商品，默认没有
	    	  //遍历收藏夹
	    	  for(var i = 0; i<$scope.Mycar.length;i++){
	    	  	//判断收藏夹里有没有该商品
	    	  	if(obj==$scope.Mycar[i]){
	    	  		has = true;
	    	  		break;
	    	  	}
	    	  }
	    	  
	    	  if(has==false){
	    	  	$scope.Mycar.push(obj)
	    	 }
	    	 console.log($scope.Mycar)
	    	   	// 点击删除
	    	 $scope.myclick = function(obj){
	    	 	var prountname = obj.name;
	    	 	console.log("dddd")
	    	 	for(var i = 0; i<$scope.Mycar.length;i++){
	    	 		if(prountname==$scope.Mycar[i].name){
	    	 			$scope.Mycar.splice(i,1)
	    	 		}
	    	 	}
	    	 	
	    	 }
	    	 
	    	}
	    
	    //添加到购物车
	     $scope.car = [];  //定义购物车
	    $scope.addtocar = function(obj){
	    	  var hasthisprouduct = false; //定义一个布尔值，判断购物车里面有没有该商品，默认没有
	    	  //遍历购物车
	    	  for(var i = 0; i<$scope.car.length;i++){
	    	  	//判断购物车里有没有该商品
	    	  	if($scope.car[i].product.name==obj.name){
	    	  		//如果有，count + 1
	    	  		$scope.car[i].count++;
	    	  		hasthisprouduct = true;
	    	  		 console.log($scope.car)
	    	  		break;
	    	  	}
	    	  }
	    	 
	    	// 点击删除
	    	 $scope.click = function(kkc){
	    	 	var obj = kkc.product.name;
	    	 	for(var i = 0; i<$scope.car.length;i++){
	    	 		if(obj==$scope.car[i].product.name){
	    	 			$scope.car.splice(i,1)
	    	 		}
	    	 	}
	    	 	
	    	 }
//	    	  	 点击删除
//      $scope.click = function(obj){
//      	//‘遍历购物车
//      	  for(var i = 0; i<$scope.car.length;i++){
//      	  	//判断购物车里的数据有没有和我们要删除的数据一致的数据
//      	  	if(obj==$scope.car[i]){
//      	  		$scope.car[i].count--;
//      	  	}
//      	  	if($scope.car[i].count==0){
//      	  		$scope.car.splice(i,1)
//      	  	}
//      	  	break;
//      	  }
//      }
        //控制购物车商品数量的加减
        $scope.jia = function(obj){
//       obj.count =$scope.count;
        	 obj.count++;
        }
         $scope.jian = function(obj){
        	 obj.count--;
        	 if( obj.count<=1){
        	 	 obj.count=1
        	 }
        }
	    	  //如果购物车里没有该商品，那么就将该商品添加到购物车里
	    	  if(hasthisprouduct==false){
	    	  	$scope.car.push({product:obj,count:1})
	    	  }
//	    	  console.log($scope.car)
	     }
	    //计算购物车里商品的总数量和总价钱
	    	  $scope.countmycar = function(){
	    	  	var totalcount = 0;   //购物车里商品的数量
	    	  	var totalprice = 0;   //购物车里商品的价钱
	    	  	//遍历一遍购物车
	    	  	for(var i = 0 ;i<$scope.car.length;i++){
	    	  		totalcount+= $scope.car[i].count;
	    	  		totalprice+=$scope.car[i].count * $scope.car[i].product.price;
	    	  	}
	    	    $scope.mytotalprice = totalprice;
	    	    return totalcount;
	    	  }
	    	  
	 	},function(error){
	 		//失败后的回调函数
	 	})
	 })
	 var my = angular.module("rr",[]);
		my.filter("up",function(){
			return function(data,pp){
			if(angular.isArray(data)){
				var typename = [];
				obj = {};
				for(var i = 0;i<data.length;i++){
					var type = data[i][pp];
					if(angular.isUndefined(obj[type])){
						typename.push(type);
						obj[type] = true
					}
				}
				return typename
			}else{
				return [];
			}
		}
	});

	 
	  