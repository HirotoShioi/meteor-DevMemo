import { Template } from 'meteor/templating';
import { Memos } from '../../api/memos.js';
import { Status }  from '../../api/status.js';
import './Board.html';

//components
import './BoardForm.js';
import './BoardContent.js';

Template.Board.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
		this.subscribe('memos');
	});
	Session.set('Title',{name:"Memo Board"});
});

Template.Board.helpers({
	lists:()=>{
		const lists =  Status.find({},{sort:{createdAt:-1}});
		lists.forEach((list)=>{
			list.memos = Memos.find({statusId:list._id},{sort:{createdAt:-1}});
		});
		return lists;
	},
});