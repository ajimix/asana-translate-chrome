/**
 * Extension to translate ASANA.
 *
 * This script file is injected into ASANA and translate function it's called each time ASANA does an XMLHttpRequest translating string of the site
 *
 * Licensed under the Apache License 2.0
 *
 * Author: Ajimix [github.com/ajimix]
 */

( function ( doc, _UNDEFINED_ ) {

	'use strict';

var _DEBUG_ = false,

	/**
	 * Quick and short function to get an element by id.
	 * @param  {String} id
	 * @return {Object} The found element.
	 */
	id = function ( id ) {
		var element = doc.getElementById( id );
		if ( _DEBUG_ && element === null ) {
			console.error( 'ID not found: ' + id );
		}
		return element;
	},

	/**
	 * Quick and short function to get an element by selector.
	 * @param  {String} selector CSS selector.
	 * @return {Array} Array of found objects.
	 */
	all = function ( selector ) {
		var elements = doc.querySelectorAll( selector );
		if ( _DEBUG_ && elements.length === 0 ) {
			console.error( 'Selector not found: ' + selector );
		}
		return elements;
	},

	/**
	 * Quick function to change text
	 * @param  {Object} element The element to process.
	 * @param  {String} string String to change.
	 * @param  {String} property Property to change (text|placeholder). Text by default.
	 * @return {Boolean} If property has been changed correctly or not.
	 */
	stringToElement = function ( element, string, property ) {
		if ( element === _UNDEFINED_ || element === null ) {
			return false;
		}

		// By default we change text, but we can also change for example placeholders (for inputs).
		if ( property === _UNDEFINED_ ) {
			property = 'text';
		}

		// Put a single element into an array.
		if ( element !== null && element instanceof Element ) {
			element = [element];
		}

		if ( element.length > 0 ) { // We only update the text if we found the element
			var newValue = chrome.i18n.getMessage( string );
			if ( newValue ){ // If empty then no change
				for ( var i = element.length - 1; i >= 0; i-- ) {
					if ( property === 'text' ) {
						element[i].textContent = newValue;
					} else if ( property === 'placeholder' ) {
						element[i].placeholder = newValue;
					}
				}
			}

			return true;
		}

		return false;
	},

	/**
	 * Changes the text of the elements replacing the occurrences of the json data.
	 * Use this for multiple strings in the same element or for elements that have children and don't have a good way to refer to the element to change.
	 * @param {Object} strings { 'text to find': 'keyword_from_strings_file', ...}
	 **/
	replaceFromElement = function ( element, strings ) {
		if ( element === _UNDEFINED_ || element === null ) {
			return false;
		}

		if ( element !== null && element instanceof Element ) {
			element = [element];
		}

		if ( element.length > 0 ) {
			for ( var i = element.length - 1; i >= 0; i-- ) {
				var newHtml = element[i].innerHTML;
				for ( var key in strings ) {
					if ( strings.hasOwnProperty( key ) && newHtml.indexOf( key ) !== -1 ) {
						newHtml = newHtml.replace( key, chrome.i18n.getMessage( strings[key] ) );
					}
				}
				if ( newHtml ) { // If empty then no change.
					element[i].innerHTML = newHtml;
				}
			}

			return true;
		}

		return false;
	},

	/**
	 * Translates strings
	 */
	translate = function () {
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

		console.time( 'Asana translate:' );

		// Try to not refer direct > child as Asana could change element structure

		// Left menu
		stringToElement( id( 'nav_search_input' ), 'Search', 'placeholder' );
		replaceFromElement( all( '.atm-name' ), {
			'My Tasks': 'MyTasks',
			'My': 'My_Tasks',
			'Tasks': 'Tasks'
		});
		stringToElement( all( '.list-item.feed .list-item-caption' ), 'Inbox' );
		replaceFromElement( all( '.recents-zipper .more-link' ), { 'Show Recents and more…': 'ShowRecents', 'Show less': 'ShowLess'} );
		stringToElement( all( '#list_navigation_view__new_pot_button .button-text' ), 'NewProject' );
		stringToElement( id( 'manage_members' ), 'InviteManageMembers' );
		stringToElement( id( 'edit_workspace_settings' ), 'EditWorkspaceSettings' );
		stringToElement( id( 'remove_self' ), 'RemoveMeFromWorkspace' );
		stringToElement( id( 'upgrade_workspace' ), 'UpgradeWorkspace' );
		replaceFromElement( all( '.team-projects .more-link' ), { 'More Projects': 'MoreProjects', 'Show Archived Projects': 'ShowArchivedProjects', 'Hide Archived Projects': 'HideArchivedProjects' } );
		stringToElement( id( 'user_menu_account_settings' ), 'AccountSettings' );
		stringToElement( id( 'user_menu_new_workspace' ), 'NewWorkspace' );
		stringToElement( id( 'user_menu_logout' ), 'LogOut' );
		stringToElement( all( '.workspace-link' ), 'ViewProjectsTagsPeople' );
		stringToElement( all( '#add_project_button .button-text' ), 'LEFT_NewProject' );
		stringToElement( all( '#add_person_button .button-text' ), 'AddPerson' );
		replaceFromElement( all( '#navigation_dock_header .title-text' ), { 'Workspace Overview': 'WorkspaceOverview' } );
		stringToElement( all( '#new_workspace' ), 'LEFT_NewWorkspace' );
		//replaceFromElement( all( '#navigation_dock_workspace' ), { 'Inbox': 'Inbox' });  // Crashes ASANA

		// Left tabs under menu
		stringToElement( all( '.projects_tab' ), 'PROJECTS' );
		stringToElement( all( '.new-project-text' ), 'PROJECTS' );
		replaceFromElement( id( 'tags_browser' ), { 'Tags': 'TAGS' });
		stringToElement( all( '.people_tab' ), 'PEOPLE' );

		// Left menu bottom
		stringToElement( all( '.feedback-link' ), 'Feedback' );
		stringToElement( all( '.help-menu-label' ), 'Help' );
		stringToElement( all( '#about_menu' ), 'About' );

		// Task info
		replaceFromElement( all( '.complete-text' ), { 'Mark Complete': 'MarkComplete', 'Mark Incomplete': 'MarkIncomplete', 'Completed': 'Completed' } );
		stringToElement( all( '.description .placeholder-content' ), 'AddNotes' );
		stringToElement( all( '.assigned_to .property-name' ), 'Assignee' );
		stringToElement( all( '.projects .placeholder' ), 'AddToProject' );
		if( !stringToElement( all( '.due_date.property-name' ), 'DueDate' ) ) { // This is for assigned due dates
			stringToElement( all( '.due_date .property-name' ), 'DueDate' ); // Unassigned ones
		}
		if( !stringToElement( all( '.tags.property-name' ), 'Tags' ) ) { // This is for assigned tags
			stringToElement( all( '.tags .property-name' ), 'Tags' ); // Unassigned ones
		}
		stringToElement( all( '.attach-label' ), 'AttachFile' );
		stringToElement( all( '.followers_du .property-name' ), 'Followers' );
		stringToElement( all( '.followers_du .placeholder' ), 'AddFollowers' );
		replaceFromElement( all( '.follow-button .button-text' ), { 'Follow': 'Follow', 'Unfollow': 'Unfollow' } );
		stringToElement( all( '.status-toggle-group .status-text' )[0], 'Today' );
		stringToElement( all( '.status-toggle-group .status-text' )[1], 'Upcoming' );
		stringToElement( all( '.status-toggle-group .status-text' )[2], 'Later' );
		stringToElement( all( '#delete_items .dropdown-menu-item-label' )[0], 'DeleteTask' );
		stringToElement( id( 'make_priority_heading' ), 'MakePriorityHeading' );
		stringToElement( all( '.details-pane-title .header-name' )[2], 'NewItem', 'placeholder' );
		stringToElement( all( '.assign-to-me-button .button-text' ), 'AssignToMe' );
		stringToElement( all( '.assignee-field-name' ), 'Assignee' );
		stringToElement( id( 'assignee_popup_typeahead_input' ), 'NameOrEmail', 'placeholder' );
		stringToElement( all( '.assigned_to .placeholder' ), 'AssignToTeammate' );
		stringToElement( all( '.comments .section-name' ), 'ActivityFeed' );
		stringToElement( all( '.comment-placeholder' ), 'Comment' );

		stringToElement( all( '#ical' ), 'ICal' );
		stringToElement( all( '#print' ), 'Print' );
		stringToElement( all( '#duplicate_project' ), 'DuplicateProject' );
		stringToElement( all( '#task_creation_email .dropdown-menu-item-label' ), 'AddTasksByEmail' );
		stringToElement( all( '#set_archived_pot' ), 'ArchiveProject' );
		stringToElement( all( '#delete_pot' ), 'DeleteProject' );
		stringToElement( all( '#convert_pot' ), 'ConvertProjectToTag' );
		stringToElement( all( '#details_property_sheet__new_comment_button .button-text' ), 'BUTTON_Comment' );

		stringToElement( all( '.nothing-selected-text' ), 'NothingSelected' ); // en: Select a task to view its details. Displays in right pane when no task is selected

		// Task activity
		replaceFromElement( all( '.comments .feed-story .comment-text' ), {
			'created task': 'ACT_CreatedTask',
			'added to': 'ACT_AddedTo',
			'assigned to': 'ACT_AssignedTo',
			'changed the due date to': 'ACT_ChangedDueDate',
			'added attachment': 'ACT_AddedAttachment',
			'marked complete': 'ACT_MarkedComplete',
			'marked incomplete': 'ACT_MarkedIncomplete',
			'unmarked today': 'ACT_UnmarkedToday',
			'marked today': 'ACT_MarkedToday',
			'created project': 'ACT_CreatedProject',
			'removed from': 'ACT_RemovedFrom',
			'moved from': 'ACT_MovedFrom',
			'removed the due date.': 'ACT_RemovedDueDate',
			'added subtask to task': 'ACT_AddedSubtask'
			// Those 3 are being refreshed by asana and seems not possible to be translated.
			// 'attached': 'ACT_Attached',
			// 'added the description.': 'ACT_AddedDescription',
			// 'changed the description.': 'ACT_ChangedDescription'
		} );
		// replaceFromElement( all( '.comment-content' ), { ' completed this task': 'ACT_MarkedComplete' } ); // Removed as it causes conflict with the show more button in the comments.

		// Top buttons above Project tasks and My tasks
		stringToElement( all( '.list-button .new-button-text' ), 'List' );
		stringToElement( all( '.calendar-button .new-button-text' ), 'Calendar' );
		stringToElement( all( '#new_menu .new-button-text' ), 'New' );
		stringToElement( all( '#new_menu_item_new_task .dropdown-menu-item-label' ), 'NewTask' );
		stringToElement( all( '#new_menu_item_new_section .dropdown-menu-item-label' ), 'NewSection' ); // does not work

		// Project tasks
		// replaceFromElement( all( '.upcoming_group .group_header' ), { 'Upcoming': 'Upcoming' }); // Crashes ASANA
		// replaceFromElement( all( '.today_group .group_header' ), { 'Today': 'Today' }); // Crashes ASANA
		stringToElement( all( '.all-my-tasks-bar .label' ), 'LATER' );
		replaceFromElement( all( '.grid_due_date' ), days );
		stringToElement( all( '.grid_pseudorow_no_prioritized .grid_cell_string' ), 'AddTask' );
		stringToElement( all( '#archive_menu .new-button-text' ), 'Archive' );
		stringToElement( id( 'archive_menu_item' ), 'ArchiveCompletedTasks' );
		replaceFromElement( id( 'toggle_archived_menu_item' ), { 'Show archived tasks': 'ShowArchivedTasks', 'Hide archived tasks': 'HideArchivedTasks' } );
		stringToElement( id( 'new_menu_item_new_priority_heading' ), 'NewPriorityHeading' );
		stringToElement( all( '#project_share_button .button-text' ), 'Share' );
		stringToElement( all( '.share-dropdown-members .header' ), 'MEMBERS' );
		stringToElement( all( '.share-dropdown-footer .header' ), 'ShareWithAnotherPerson' );
		replaceFromElement( all( '.collapse-expand-all .button-text' ), { 'Collapse All': 'CollapseAll', 'Expand All': 'ExpandAll' } );
		stringToElement( all( '.drop-indicator .toggle-link' ), 'Collapse' );
		stringToElement( all( '#group_by_priority .dropdown-menu-item-label' ), 'Priority' );
		stringToElement( all( '#group_by_assignee .dropdown-menu-item-label' ), 'Assignee' );
		stringToElement( all( '#group_by_due_date .dropdown-menu-item-label' ), 'Date' );
		stringToElement( all( '#group_by_project .dropdown-menu-item-label' ), 'Project' );
		stringToElement( all( '#group_by_heart .dropdown-menu-item-label' ), 'Hearts' );
		stringToElement( all( '.filter-buttons > .toggle-button > .button-text' ), 'All' );
		stringToElement( all( '#project_notes .description-placeholder' ), 'AddADescription' );
		stringToElement( all( '.sort-button .new-button-text' ), 'Sort' );
		stringToElement( all( '.filter-button .new-button-text' ), 'Filter' );

		// Tips info
		replaceFromElement( all( '.tooltip-body' ), {
			'Marked for Upcoming. Click to change.': 'TIP_MarkedForUpcoming',
			'Marked for Today. Click to change.': 'TIP_MarkedForToday',
			'Create tasks and headings': 'TIP_CreateTasksAndHeadings',
			'Hide completed tasks.': 'TIP_HideCompletedTasks',
			'Unfollow this task to stop receiving messages about activity.': 'TIP_UnfollowTask',
			'Follow this task if you want to receive messages about activity.': 'TIP_FollowTask',
			'The Activity Feed shows the history of this task.': 'TIP_ActivityFeedInfo',
			'Remove Follower': 'TIP_RemoveFollower',
			'Recently Viewed': 'TIP_RecentlyViewed',
			'Marked as Favorite': 'TIP_MarkedFavorite'
		} );

		// Bottom buttons
		stringToElement( all( '#new_button .key-action' ), 'NewTask' );
		// stringToElement( all( '.key-action:contains("Mark Complete")' ), 'MarkComplete' ); @todo
		stringToElement( all( '#delete_button .key-action' ), 'DeleteTask' );
		// stringToElement( all( '.key-action:contains("Move Down")' ), 'MoveDown' ); @todo
		// stringToElement( all( '.key-action:contains("Jump Down")' ), 'JumpDown' ); @todo
		stringToElement( all( '#close_details_button .key-action' ), 'CloseDetails' );
		stringToElement( all( '#quick_add_button .key-action' ), 'QuickAdd' );
		stringToElement( id( 'more_shortcuts_link' ), 'More' );

		console.timeEnd( 'Asana translate:' );

	};

// This is the request that sends the background.js
chrome.extension.onRequest.addListener( function () {
	translate();
} );

} ( document ) );
