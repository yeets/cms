Pongo.Page={$create_pg_btn:$("#create-page"),$create_el_btn:$("#create-element"),$page_lang:$("#change-lang"),$page_id:Pongo.UI.pageId(),$page_list:$(".dd"),$el_list:$(".dl"),$el_counter:$(".element-toggle span"),pg_dropped_id:null,el_dropped_id:null,page_item_tpl:'<li class="dd-item" data-id="<%= id %>"><div class="dd-handle"><i class="fa fa-unchecked"></i> <%= name %></div><a href="<%= url %>" class="<%= cls %>"><i class="fa fa-chevron-right"></i></a></li>',el_item_tpl:'<li class="dl-item" data-id="<%= id %>"><div class="dl-handle"> <%= name %> </div><label><input type="checkbox" value="<%= id %>" class="is_valid"></label><a href="<%= url %>" class="<%= cls %>"><i class="fa fa-chevron-left"></i></a></li>',createNewElement:function(){var a=this;a.$create_el_btn.on("click",function(){var b=a.$page_id,c=Pongo.UI.lang;$.post(Pongo.UI.url("api/element/create"),{page_id:b,lang:c},function(b){if("success"==b.status){var c=_.template(a.el_item_tpl),d=c(b),e=$(".dl ol");e.find("a.new").removeClass("new"),e.prepend(d),Pongo.UI.counterUpDown(b.counter),a.$el_list.nestable("serialize"),Pongo.UI.createAlertMessage(b,null,null)}else Pongo.UI.createAlertMessage(b,null,null);setTimeout(function(){Pongo.UI.resetBtn()},Pongo.UI.timeout)},"json")})},createNewPage:function(){var a=this;a.$create_pg_btn.on("click",function(){var b=Pongo.UI.lang;$.post(Pongo.UI.url("api/page/create"),{lang:b},function(c){if("success"==c.status){var d=_.template(a.page_item_tpl),e=d(c),f=$(".dd[rel="+b+"] > ol");f.find("a.new").removeClass("new"),f.prepend(e),a.$page_list.nestable("serialize"),Pongo.UI.createAlertMessage(c,null,null)}else Pongo.UI.createAlertMessage(c,null,null);setTimeout(function(){Pongo.UI.resetBtn()},Pongo.UI.timeout)},"json")})},elementNestablePlugin:function(){var a=this;a.$el_list.nestable({maxDepth:0,rootClass:"dl",listClass:"dl-list",itemClass:"dl-item",dragClass:"dl-dragel",handleClass:"dl-handle",placeClass:"dl-placeholder",dropCallback:function(b){a.reorderElement(b)}}).on("reorder",function(){a.reorderElementPost()})},elementUpdate:function(a){$item=$(".dl-item[data-id="+a.id+"] > .dl-handle"),$item.find("span").html(a.name)},reorderElement:function(a){this.el_dropped_id=a,this.reorderElementLoading()},reorderElementLoading:function(){var a=this.el_dropped_id,b=$(".dl-item[data-id="+a+"] > a").find("i");b.removeClass("fa fa-chevron-left").addClass("fa fa-refresh fa fa-spin")},reorderElementPost:function(){var a=this,b=a.reorderElementStringify(this.$el_list);$.post(Pongo.UI.url("api/element/order"),{elements:b,page_id:a.$page_id},function(b){Pongo.UI.createAlertMessage(b,null,null),setTimeout(function(){a.reorderElementReset()},Pongo.UI.timeout)},"json")},reorderElementReset:function(){var a=this.el_dropped_id,b=$(".dl-item[data-id="+a+"] > a").find("i");b.removeClass("fa fa-refresh fa fa-spin").addClass("fa fa-chevron-left")},reorderElementStringify:function(a){if(JSON&&this.$el_list){var b=a.nestable("serialize");return JSON.stringify(b)}var c={status:"error",msg:"Unsupported browser!"};Pongo.UI.createAlertMessage(c,null,null)},pageNestablePlugin:function(){var a=this;a.$page_list.nestable({dropCallback:function(b){a.reorderPage(b)}}).on("reorder",function(){a.reorderPagePost()})},pageExpColl:function(){var a=this;$(".page-controls").on("click",function(b){var c=$(b.target),d=c.data("action");"expand-all"===d&&a.$page_list.nestable("expandAll"),"collapse-all"===d&&a.$page_list.nestable("collapseAll")})},pageSelectLang:function(){var a=this;Pongo.UI.lang=this.$page_lang.val(),$(".dd[rel="+Pongo.UI.lang+"]").show(),this.$page_lang.on("change",function(){Pongo.UI.lang=a.$page_lang.val(),$.post(Pongo.UI.url("api/page/lang"),{lang:Pongo.UI.lang},function(b){a.$page_list.hide(),$(".dd[rel="+Pongo.UI.lang+"]").show(),Pongo.UI.createAlertMessage(b,null,null)},"json")})},pageError:function(a){$.each(a,function(a,b){$item=$(".form-group[rel="+a+"]"),$item.removeClass("has-error"),$item.find(".help-block").remove(),$item.addClass("has-error"),$item.children("label").append('<span class="err"> - '+b+"</span>")})},pageInform:function(a){$.each(a,function(a,b){$item=$(".form-group[rel="+a+"]"),$item.removeClass("has-error"),$item.find(".help-block").remove(),$item.append('<span class="help-block">'+b+"</span>")})},pageUpdate:function(a){$(".slug-full").html(a.slug),$item=$(".dd-item[data-id="+a.id+"] > .dd-handle"),$item.find("span").html(a.name);var b=$item.find(".fa fa-home");a.home?($(".dd[rel="+a.lang+"] > ol").find(".fa fa-home").hide(),b.show()):b.hide();var c=$item.find(".check");a.checked&&c.hasClass("fa fa-unchecked")&&c.removeClass("fa fa-unchecked").addClass("fa fa-check-square-o"),!a.checked&&c.hasClass("fa fa-check")&&c.removeClass("fa fa-check-square-o").addClass("fa fa-unchecked")},reorderPage:function(a){this.pg_dropped_id=a,this.reorderPageLoading()},reorderPageLoading:function(){var a=this.pg_dropped_id,b=$(".dd-item[data-id="+a+"] > a").find("i");b.removeClass("fa fa-chevron-right").addClass("fa fa-refresh fa fa-spin")},reorderPagePost:function(){var a=this,b=a.reorderPageStringify();$.post(Pongo.UI.url("api/page/order"),{pages:b},function(b){Pongo.UI.createAlertMessage(b,null,null),setTimeout(function(){a.reorderPageReset()},Pongo.UI.timeout)},"json")},reorderPageReset:function(){var a=this.pg_dropped_id,b=$(".dd-item[data-id="+a+"] > a").find("i");b.removeClass("fa fa-refresh fa fa-spin").addClass("fa fa-chevron-right")},reorderPageStringify:function(){if(JSON&&this.$page_list){var a=$(".dd[rel="+Pongo.UI.lang+"]").nestable("serialize");return JSON.stringify(a)}var b={status:"error",msg:"Unsupported browser!"};Pongo.UI.createAlertMessage(b,null,null)},toggleElements:function(){$(".right-toggle").on("click",function(){Pongo.UI.$body.toggleClass("push-left")})},toggleOptions:function(){$(".options-toggle").on("click",function(){Pongo.UI.$body.toggleClass("push-right-options")})},togglePages:function(){$(".page-toggle").on("click",function(){Pongo.UI.$body.toggleClass("push-right")})},untoggleMenu:function(){Pongo.UI.$overlay.on("click",function(){Pongo.UI.$body.removeClass(),$(".close-modal").trigger("click")})}},$(function(){Pongo.Page.toggleOptions(),Pongo.Page.toggleElements(),Pongo.Page.togglePages(),Pongo.Page.createNewPage(),Pongo.Page.untoggleMenu(),Pongo.Page.pageNestablePlugin(),Pongo.Page.pageExpColl(),Pongo.Page.pageSelectLang()});