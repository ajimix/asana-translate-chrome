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
	 * @param  {String} cssSelector CSS selector.
	 * @param  {Bool} firstElement Options, if true, returns just the first found element.
	 * @return {Array} Array of found objects.
	 */
	sel = function ( cssSelector, firstElement ) {
		var elements;
		if ( firstElement !== _UNDEFINED_ && firstElement  === true ) {
			elements = doc.querySelector( cssSelector );
		} else {
			elements = doc.querySelectorAll( cssSelector );
		}

		if ( _DEBUG_ && ( elements === null || elements.length === 0 ) ) {
			console.error( 'Selector not found: ' + cssSelector );
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
		replaceFromElement( sel( '.atm-name' ), {
			'My Tasks': 'MyTasks',
			'My': 'My_Tasks',
			'Tasks': 'Tasks'
		});
		stringToElement( sel( '.list-item.feed .list-item-caption' ), 'Inbox' );
		replaceFromElement( sel( '.recents-zipper .more-link' ), { 'Show Recents and more…': 'ShowRecents', 'Show less': 'ShowLess'} );
		stringToElement( id( 'manage_members' ), 'InviteManageMembers' );
		stringToElement( sel( '.group-invite-overlay', true ), 'InvitePeople' );
		stringToElement( id( 'edit_workspace_settings' ), 'EditWorkspaceSettings' );
		stringToElement( id( 'remove_self' ), 'RemoveMeFromWorkspace' );
		stringToElement( id( 'upgrade_workspace' ), 'UpgradeWorkspace' );
		replaceFromElement( sel( '#show_tags .dropdown-menu-item-label', true ), { 'Show Tags List': 'ShowTagsList', 'Hide Tags List': 'HideTagsList' } );
		replaceFromElement( sel( '#toggle_show_archived_projects .dropdown-menu-item-label', true ), { 'Show Archived Projects': 'ShowArchivedProjects', 'Hide Archived Projects': 'HideArchivedProjects' } );
		replaceFromElement( sel( '.team-projects .more-link' ), { 'More Projects': 'MoreProjects', 'Show Archived Projects': 'ShowArchivedProjects', 'Hide Archived Projects': 'HideArchivedProjects' } );
		stringToElement( id( 'user_menu_account_settings' ), 'AccountSettings' );
		stringToElement( id( 'user_menu_new_workspace' ), 'NewWorkspace' );
		stringToElement( id( 'user_menu_logout' ), 'LogOut' );
		stringToElement( sel( '.workspace-link', true ), 'ViewProjectsTagsPeople' );
		stringToElement( sel( '#add_project_button .button-text', true ), 'LEFT_NewProject' );
		stringToElement( sel( '#add_person_button .button-text', true ), 'AddPerson' );
		replaceFromElement( sel( '#navigation_dock_header .title-text' ), { 'Workspace Overview': 'WorkspaceOverview' } );
		stringToElement( sel( '#new_workspace', true ), 'LEFT_NewWorkspace' );
		//replaceFromElement( sel( '#navigation_dock_workspace' ), { 'Inbox': 'Inbox' });  // Crashes ASANA

		// Left tabs under menu
		stringToElement( sel( '.projects_tab' ), 'PROJECTS' );
		stringToElement( sel( '.new-project-text' ), 'PROJECTS' );
		replaceFromElement( id( 'tags_browser' ), { 'Tags': 'TAGS' });
		stringToElement( sel( '.people_tab' ), 'PEOPLE' );

		// Left menu bottom
		stringToElement( sel( '.feedback-link' ), 'Feedback' );
		stringToElement( sel( '.help-menu-label' ), 'Help' );
		replaceFromElement( id( 'about_menu' ), { 'About': 'About' } );

		// Task info
		replaceFromElement( sel( '.complete-text' ), { 'Mark Complete': 'MarkComplete', 'Mark Incomplete': 'MarkIncomplete', 'Completed': 'Completed' } );
		stringToElement( sel( '.description .placeholder-content' ), 'AddNotes' );
		stringToElement( sel( '.assigned_to .property-name' ), 'Assignee' );
		stringToElement( sel( '.projects .placeholder' ), 'AddToProject' );
		if( !stringToElement( sel( '.due_date.property-name' ), 'DueDate' ) ) { // This is for assigned due dates
			stringToElement( sel( '.due_date .property-name' ), 'DueDate' ); // Unassigned ones
		}
		if( !stringToElement( sel( '.tags.property-name' ), 'Tags' ) ) { // This is for assigned tags
			stringToElement( sel( '.tags .property-name' ), 'Tags' ); // Unassigned ones
		}
		stringToElement( sel( '.attach-label' ), 'AttachFile' );
		stringToElement( sel( '.followers_du .property-name' ), 'Followers' );
		stringToElement( sel( '.followers_du .placeholder' ), 'AddFollowers' );
		replaceFromElement( sel( '.follow-button .button-text' ), { 'Follow': 'Follow', 'Unfollow': 'Unfollow' } );
		replaceFromElement( sel( '.drop-indicator .expandable' ), { 'Today': 'Today', 'Upcoming': 'Upcoming', 'Later': 'Later' } );
		stringToElement( sel( '#delete_items .dropdown-menu-item-label', true ), 'DeleteTask' );
		stringToElement( sel( '#duplicate_task .dropdown-menu-item-label', true ), 'MakeACopy' );
		stringToElement( sel( '#print_task .dropdown-menu-item-label', true ), 'Print' );
		stringToElement( sel( '#close_as_duplicate .dropdown-menu-item-label', true ), 'MergeDuplicateTasks' );
		stringToElement( sel( '#maximize_details .dropdown-menu-item-label', true ), 'Expand' );
		stringToElement( id( 'make_priority_heading' ), 'MakePriorityHeading' );
		stringToElement( sel( '.details-pane-title .header-name' )[2], 'NewItem', 'placeholder' );
		stringToElement( sel( '.assign-to-me-button .button-text' ), 'AssignToMe' );
		stringToElement( sel( '.assignee-field-name' ), 'Assignee' );
		stringToElement( id( 'assignee_popup_typeahead_input' ), 'NameOrEmail', 'placeholder' );
		stringToElement( sel( '.assigned_to .placeholder' ), 'AssignToTeammate' );
		stringToElement( sel( '.comments .section-name' ), 'ActivityFeed' );
		stringToElement( sel( '.comment-row.body .composer-placeholder .hotkey-hinted-string', true ), 'WriteComment' );
		stringToElement( sel( '#details_property_sheet__new_comment_button .new-button-text', true ), 'Comment' );

		stringToElement( sel( '#ical' ), 'ICal' );
		stringToElement( sel( '#print' ), 'Print' );
		stringToElement( sel( '#duplicate_project' ), 'DuplicateProject' );
		stringToElement( sel( '#task_creation_email .dropdown-menu-item-label' ), 'AddTasksByEmail' );
		stringToElement( sel( '#set_archived_pot .dropdown-menu-item-label', true ), 'ArchiveProject' );
		stringToElement( sel( '#delete_pot .dropdown-menu-item-label', true ), 'DeleteProject' );
		stringToElement( sel( '#convert_pot .dropdown-menu-item-label', true ), 'ConvertProjectToTag' );

		stringToElement( sel( '.nothing-selected-text' ), 'NothingSelected' ); // en: Select a task to view its details. Displays in right pane when no task is selected

		// Task activity
		replaceFromElement( sel( '.comments .feed-story .comment-text' ), {
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
		// replaceFromElement( sel( '.comment-content' ), { ' completed this task': 'ACT_MarkedComplete' } ); // Removed as it causes conflict with the show more button in the comments.

		// Top buttons above Project tasks and My tasks
		stringToElement( sel( '.list-button .new-button-text', true ), 'List' );
		stringToElement( sel( '.calendar-button .new-button-text', true ), 'Calendar' );
		stringToElement( sel( '#new_menu .new-button-text' ), 'New' );
		stringToElement( sel( '#new_menu_item_new_task .dropdown-menu-item-label' ), 'NewTask' );
		stringToElement( sel( '#new_menu_item_new_section .dropdown-menu-item-label' ), 'NewSection' ); // does not work

		// Project tasks
		// replaceFromElement( sel( '.upcoming_group .group_header' ), { 'Upcoming': 'Upcoming' }); // Crashes ASANA
		// replaceFromElement( sel( '.today_group .group_header' ), { 'Today': 'Today' }); // Crashes ASANA
		stringToElement( sel( '.all-my-tasks-bar .label' ), 'LATER' );
		replaceFromElement( sel( '.grid_due_date' ), days );
		stringToElement( sel( '.grid_pseudorow_no_prioritized .grid_cell_string' ), 'AddTask' );
		stringToElement( sel( '#archive_menu .new-button-text' ), 'Archive' );
		stringToElement( id( 'archive_menu_item' ), 'ArchiveCompletedTasks' );
		replaceFromElement( id( 'toggle_archived_menu_item' ), { 'Show archived tasks': 'ShowArchivedTasks', 'Hide archived tasks': 'HideArchivedTasks' } );
		stringToElement( id( 'new_menu_item_new_priority_heading' ), 'NewPriorityHeading' );
		stringToElement( sel( '#project_share_button .button-text' ), 'Share' );
		stringToElement( sel( '.share-dropdown-members .header' ), 'MEMBERS' );
		stringToElement( sel( '.share-dropdown-footer .header' ), 'ShareWithAnotherPerson' );
		replaceFromElement( sel( '.collapse-expand-all .button-text' ), { 'Collapse All': 'CollapseAll', 'Expand All': 'ExpandAll' } );
		stringToElement( sel( '.drop-indicator .toggle-link' ), 'Collapse' );
		stringToElement( sel( '#group_by_priority .dropdown-menu-item-label' ), 'Priority' );
		stringToElement( sel( '#group_by_assignee .dropdown-menu-item-label' ), 'Assignee' );
		stringToElement( sel( '#group_by_due_date .dropdown-menu-item-label' ), 'Date' );
		stringToElement( sel( '#group_by_project .dropdown-menu-item-label' ), 'Project' );
		stringToElement( sel( '#group_by_heart .dropdown-menu-item-label' ), 'Hearts' );
		stringToElement( sel( '.filter-buttons > .toggle-button > .button-text' ), 'All' );
		stringToElement( sel( '#project_notes .description-placeholder' ), 'AddADescription' );
		stringToElement( sel( '.sort-button .new-button-text' ), 'Sort' );
		stringToElement( sel( '.filter-button .new-button-text' ), 'Filter' );

		// Tips info
		replaceFromElement( sel( '.tooltip-body' ), {
			'Create a project': 'NewProject',
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
		stringToElement( sel( '#new_button .key-action' ), 'NewTask' );
		stringToElement( sel( '#delete_button .key-action' ), 'DeleteTask' );
		stringToElement( sel( '#close_details_button .key-action' ), 'CloseDetails' );
		stringToElement( sel( '#open_details_button .key-action' ), 'OpenDetails' );
		stringToElement( sel( '#quick_add_button .key-action' ), 'QuickAdd' );
		stringToElement( id( 'more_shortcuts_link' ), 'More' );
		replaceFromElement( sel( '.key-action' ), {
			'Mark Complete': 'MarkComplete',
			'Move Down': 'MoveDown',
			'Jump Down': 'JumpDown'
		});

		console.timeEnd( 'Asana translate:' );

	};

// This is the request that sends the background.js
chrome.extension.onRequest.addListener( function () {
	translate();
} );

} ( document ) );
