/**
*
* Extension to translate ASANA.
*
* This script file is injected into ASANA and translate function it's called each time ASANA does an XMLHttpRequest translating string of the site
* 
* Licensed under the Apache License 2.0
*
* Author: Ajimix [github.com/ajimix]
*
*/
var stringToElement = function(element, string, property){ // Quick function to change text
		if(typeOf(property) === 'null'){ property = 'text'; } // By default we change text, but we can also change for example placeholders (for inputs)

		if(instanceOf(element, Element) || (instanceOf(element, Elements) && element.length > 0)){ // We only update the text if we found the element
			element.set(property, chrome.i18n.getMessage(string));
			return true;
		}
		return false;
	},

	/**
	 * Changes the text of the elements replacing the occurrences of the json data.
	 * Use this for multiple strings in the same element or for elements that have children and don't have a good way to refer to the element to change.
	 *
	 * @param json strings {'text to find': 'keyword_from_strings_file', ...}
	 **/
	replaceFromElement = function(element, strings){
		element = $$(element);
		if(element.length > 0 && instanceOf(element, Elements)){
			element.each(function(el){ // Do the same for each element in array of elements
				var newHtml = el.get('html');
				Object.each(strings, function(item, key){
					newHtml = newHtml.replace(key, chrome.i18n.getMessage(item));
				});
				el.set('html', newHtml);
			});
			return true;
		}
		return false;
	},

	// Translates strings
	translate = function(){
		var days = {
			'Today': 'Today',
			'Yesterday': 'Yesterday',
			'Tomorrow': 'Tomorrow',
			'Monday': 'Monday',
			'Tuesday': 'Tuesday',
			'Wednesday': 'Wednesday',
			'Thursday': 'Thursday',
			'Friday': 'Friday',
			'Saturday': 'Saturday',
			'Sunday': 'Sunday'
		};

		console.time("Asana translate:");

		// Left menu
		stringToElement($('nav_search_input'), 'Search', 'placeholder');
		stringToElement($$('.atm-name'), 'MyTasks');
		stringToElement($$('#list_navigation_view__new_pot_button .button-text'), 'NewProject');
		stringToElement($('manage_members'), 'InviteManageMembers');
		stringToElement($('edit_workspace_settings'), 'EditWorkspaceSettings');
		stringToElement($('remove_self'), 'RemoveMeFromWorkspace');
		stringToElement($('upgrade_workspace'), 'UpgradeWorkspace');
		replaceFromElement($('toggle_show_archived_projects'), {'Show Archived Projects': 'ShowArchivedProjects', 'Hide Archived Projects': 'HideArchivedProjects'});
		stringToElement($('user_menu_account_settings'), 'AccountSettings');
		stringToElement($('user_menu_new_workspace'), 'NewWorkspace');
		stringToElement($('user_menu_logout'), 'LogOut');

		// Left tabs under menu
		stringToElement($$('.projects_tab'), 'PROJECTS');
		stringToElement($$('.tags_tab'), 'TAGS');
		stringToElement($$('.people_tab'), 'PEOPLE');

		// Task info
		stringToElement($$('.complete-text'), 'MarkComplete');
		stringToElement($$('.description .placeholder-content'), 'AddNotes');
		stringToElement($$('.assigned_to .property-name'), 'Assignee');
		stringToElement($$('.projects .property-name'), 'Projects');
		stringToElement($$('.projects .placeholder'), 'AddToProject');
		if(!stringToElement($$('.due_date.property-name'), 'DueDate')){ // This is for assigned due dates
			stringToElement($$('.due_date .property-name'), 'DueDate'); // Unassigned ones
		}
		if(!stringToElement($$('.tags.property-name'), 'Tags')){ // This is for assigned tags
			stringToElement($$('.tags .property-name'), 'Tags'); // Unassigned ones
		}
		stringToElement($$('.attach_label'), 'AttachFile');
		stringToElement($$('.followers_du .property-name'), 'Followers');
		stringToElement($$('.followers_du .placeholder'), 'AddFollowers');
		replaceFromElement($$('.follow-button .button-text'), {'Follow': 'Follow', 'Unfollow': 'Unfollow'});
		stringToElement($$('.status-toggle-group .status-text')[0], 'Today');
		stringToElement($$('.status-toggle-group .status-text')[1], 'Upcoming');
		stringToElement($$('.status-toggle-group .status-text')[2], 'Later');
		stringToElement($('delete_items'), 'DeleteTask');
		stringToElement($('make_priority_heading'), 'MakePriorityHeading');
		stringToElement($$('.details-pane-title .header-name')[2], 'NewItem', 'placeholder');
		stringToElement($$('.assign-to-me-button .button-text'), 'AssignToMe');
		stringToElement($$('.comments .section-name'), 'ActivityFeed');
		stringToElement($$('.comment-placeholder'), 'Comment');

		// Project tasks
		replaceFromElement($$('.upcoming_group .group_header'), {'Upcoming': 'Upcoming'});
		replaceFromElement($$('.today_group .group_header'), {'Today': 'Today'});
		stringToElement($$('.all-my-tasks-bar .label'), 'LATER');
		replaceFromElement($$('.grid_due_date'), days);
		stringToElement($$('.grid_pseudorow_no_prioritized .grid_cell_string'), 'AddTask');
		stringToElement($$('#archive_menu .button-text'), 'Archive');
		stringToElement($('archive_menu_item'), 'ArchiveCompletedTasks');
		replaceFromElement($('toggle_archived_menu_item'), {'Show archived tasks': 'ShowArchivedTasks', 'Hide archived tasks': 'HideArchivedTasks'});
		stringToElement($$('#new_menu .button-text'), 'New');
		stringToElement($('new_menu_item_new_task'), 'NewTask');
		stringToElement($('new_menu_item_new_priority_heading'), 'NewPriorityHeading');
		stringToElement($$('#project_share_button .button-text'), 'Share');
		replaceFromElement($$('.collapse-expand-all .button-text'), {'Collapse All': 'CollapseAll', 'Expand All': 'ExpandAll'});
		stringToElement($$('#group_by_priority .button-text'), 'Priority');
		stringToElement($$('#group_by_assignee .button-text'), 'Assignee');
		stringToElement($$('#group_by_due_date .button-text'), 'Date');
		stringToElement($$('#group_by_project .button-text'), 'Project');

		// Tips info
		replaceFromElement($$('.tooltip-body'), {
			'Marked for Upcoming. Click to change.': 'TIP_MarkedForUpcoming',
			'Marked for Today. Click to change.': 'TIP_MarkedForToday',
			'Create tasks and headings': 'TIP_CreateTasksAndHeadings',
			'Hide completed tasks.': 'TIP_HideCompletedTasks',
			'Unfollow this task to stop receiving emails about it.': 'TIP_UnfollowTask',
			'Follow this task if you want to receive emails when other people comment on it.': 'TIP_FollowTask',
			'The Activity Feed shows the history of this task.': 'TIP_ActivityFeedInfo'
		});

		// Bottom buttons
		stringToElement($$('#new_button .key-action'), 'NewTask');
		stringToElement($$('.key-action:contains("Mark Complete")'), 'MarkComplete');
		stringToElement($$('#delete_button .key-action'), 'DeleteTask');
		stringToElement($$('.key-action:contains("Move Down")'), 'MoveDown');
		stringToElement($$('.key-action:contains("Jump Down")'), 'JumpDown');
		stringToElement($$('#close_details_button .key-action'), 'CloseDetails');
		stringToElement($$('#quick_add_button .key-action'), 'QuickAdd');
		stringToElement($('more_shortcuts_link'), 'More');

		console.timeEnd("Asana translate:");
		
	};

// This is the request that sends the background.js
chrome.extension.onRequest.addListener(function() {
	translate();
});