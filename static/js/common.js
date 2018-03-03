$.extend({
	
	url:'http://www.javaweb.io',
	
	//url:'http://127.0.0.1:1024',
	
	log:console.log,
	
	warning:function(message){
		$.messager.alert('警告',message,'warning');
	},
	info:function(message){
		$.messager.alert('提示',message,'info');
	},
	error:function(message){
		$.messager.alert('异常',message,'error');
	},
	show:function(message){
		$.messager.show({
			title:'提示',
			msg:message,
			timeout:5000,
			showType:'slide'
		});
	},
	
	doAjax:function(options){
		
		if(options.progress == undefined){
			//默认需要显示进度条
			options.progress = true;
		}
		if(options.showSuccessMessage == undefined){
			//默认需要右下角提示成功信息
			options.showSuccessMessage = true;
		}
		if(options.alertErrorMessage == undefined){
			//默认需要弹出失败信息
			options.alertErrorMessage = true;
		}
		
		options.url = options.url.replace($.url,'');
		
		if(options.progress){
			$.messager.progress({text:options.progressMessage || '执行中...'});
		}
		
		$.ajax({
			url:$.url + options.url,
			type:options.method || 'POST',
			data:options.data,
			dataType:options.dataType || 'JSON',
			xhr: function(){                            
				tempXhr = $.ajaxSettings.xhr();		
				tempXhr.withCredentials = true;
				return tempXhr;
			},
			headers: {
				"x-requested-with":"XMLHttpRequest",
			},
			contentType:options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
			success:function(response){
				if(response.success){
					options.showSuccessMessage && $.show(response.message)
					options.success && options.success(response);
				}else{
					options.alertErrorMessage && $.warning(response.message);
					options.error && options.error(response);
				}
			},
			error:function(e){
				$.error('执行异常,请检查本地网络环境,或者联系管理员');
			},
			complete:function(){
				options.complete && options.complete();
				options.progress && $.messager.progress('close');
			}
		});
	},
	
	formTest:function(form,call){
		if(form.form('validate')){
			call();
		}else{
			$.show('参数校验失败');
		}
	}
});

/**
 * easyui 扩展

$.extend($.fn.form.methods, {    
});  */


