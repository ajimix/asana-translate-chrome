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

( function ( doc, _UNDEFINED_ ) {

	'use strict';

	/**
	 * Quick function to change text
	 * @param  {object} element The element to process.
	 * @param  {string} string String to change.
	 * @param  {string} property Property to change. Text by default.
	 * @return {Boolean} If property has been changed correctly or not.
	 */
var stringToElement = function ( element, string, property ) {
		// By default we change text, but we can also change for example placeholders (for inputs)
		if ( property === _UNDEFINED_ ) {
			property = 'text';
		}

		if( instanceOf( element, Element ) || ( instanceOf( element, Elements ) && element.length > 0 ) ) { // We only update the text if we found the element
			var newValue = chrome.i18n.getMessage( string );
			if ( newValue ){ // If empty then no change
				element.set( property, newValue );
			}
			return true;
		}
		return false;
	},

	/**
	 * Changes the text of the elements replacing the occurrences of the json data.
	 * Use this for multiple strings in the same element or for elements that have children and don't have a good way to refer to the element to change.
	 *
	 * @param json strings { 'text to find': 'keyword_from_strings_file', ...}
	 **/
	replaceFromElement = function ( element, strings ) {
		element = $$( element );
		if ( element.length > 0 && instanceOf( element, Elements ) ) {
			element.each( function( el ) { // Do the same for each element in array of elements
				var newHtml = el.get( 'html' );
				Object.each( strings, function( item, key ) {
					if( newHtml.indexOf( key ) !== -1 ) {
						newHtml = newHtml.replace( key, chrome.i18n.getMessage( item ) );
					}
				} );
				if ( newHtml ) { // If empty then no change
					el.set( 'html', newHtml ) ;
				}
			} );
			return true;
		}
		return false;
	},

	// Translates strings
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

		console.time( "Asana translate:" );

		// Try to not refer direct > child as Asana could change element structure

		// Left menu
		stringToElement( $( 'nav_search_input' ), 'Search', 'placeholder' );
		replaceFromElement( $$( '.atm-name' ), {
			'My Tasks': 'MyTasks',
			'My': 'My_Tasks',
			'Tasks': 'Tasks'
		});
		stringToElement( $$( '.list-item.feed .list-item-caption' ), 'Inbox' );
		replaceFromElement( $$( '.recents-zipper .more-link' ), { 'Show Recents and more…': 'ShowRecents', 'Show less': 'ShowLess'} );
		stringToElement( $$( '#list_navigation_view__new_pot_button .button-text' ), 'NewProject' );
		stringToElement( $( 'manage_members' ), 'InviteManageMembers' );
		stringToElement( $( 'edit_workspace_settings' ), 'EditWorkspaceSettings' );
		stringToElement( $( 'remove_self' ), 'RemoveMeFromWorkspace' );
		stringToElement( $( 'upgrade_workspace' ), 'UpgradeWorkspace' );
		replaceFromElement( $$( '.team-projects .more-link' ), { 'More Projects': 'MoreProjects', 'Show Archived Projects': 'ShowArchivedProjects', 'Hide Archived Projects': 'HideArchivedProjects' } );
		stringToElement( $( 'user_menu_account_settings' ), 'AccountSettings' );
		stringToElement( $( 'user_menu_new_workspace' ), 'NewWorkspace' );
		stringToElement( $( 'user_menu_logout' ), 'LogOut' );
		stringToElement( $$( '.workspace-link' ), 'ViewProjectsTagsPeople' );
		stringToElement( $$( '#add_project_button .button-text' ), 'LEFT_NewProject' );
		stringToElement( $$( '#add_person_button .button-text' ), 'AddPerson' );
		replaceFromElement( $$( '#navigation_dock_header .title-text' ), { 'Workspace Overview': 'WorkspaceOverview' } );
		stringToElement( $$( '#new_workspace' ), 'LEFT_NewWorkspace' );
		//replaceFromElement( $$( '#navigation_dock_workspace' ), { 'Inbox': 'Inbox' });  // Crashes ASANA

		// Left tabs under menu
		stringToElement( $$( '.projects_tab' ), 'PROJECTS' );
		stringToElement( $$( '.new-project-text' ), 'PROJECTS' );
		//stringToElement( $$( 'recents-zipper .more-link' ), 'ShowArchivedProjects' );
		//stringToElement( $$( '.team-projects .more-link' ), 'ShowArchivedProjects' );		
		//stringToElement( $$( '.tags_tab' ), 'TAGS' ); //seems like layout has been changed
		replaceFromElement( $$( '#tags_browser' ), { 'Tags': 'TAGS' });
		stringToElement( $$( '.people_tab' ), 'PEOPLE' );

		// Left menu bottom
		//replaceFromElement( $$( '#footer' ), { 'Feedback': 'Feedback' });  // Crashes ASANA// upd_by_hellt: direct access via class .feedback-link doesnt crash
		stringToElement( $$( '.feedback-link' ), 'Feedback' );
		stringToElement( $$( '.help-menu-label' ), 'Help' );
		stringToElement( $$( '#about_menu' ), 'About' );

		// Task info
		replaceFromElement( $$( '.complete-text' ), { 'Mark Complete': 'MarkComplete', 'Mark Incomplete': 'MarkIncomplete', 'Completed': 'Completed' } );
		stringToElement( $$( '.description .placeholder-content' ), 'AddNotes' );
		stringToElement( $$( '.assigned_to .property-name' ), 'Assignee' );
		//stringToElement( $$( '.projects .property-name' ), 'Projects' ); //if enabled: displays text instead of picture left from projects names
		stringToElement( $$( '.projects .placeholder' ), 'AddToProject' );
		if( !stringToElement( $$( '.due_date.property-name' ), 'DueDate' ) ) { // This is for assigned due dates
			stringToElement( $$( '.due_date .property-name' ), 'DueDate' ); // Unassigned ones
		}
		if( !stringToElement( $$( '.tags.property-name' ), 'Tags' ) ) { // This is for assigned tags
			stringToElement( $$( '.tags .property-name' ), 'Tags' ); // Unassigned ones
		}
		stringToElement( $$( '.attach-label' ), 'AttachFile' );
		stringToElement( $$( '.followers_du .property-name' ), 'Followers' );
		stringToElement( $$( '.followers_du .placeholder' ), 'AddFollowers' );
		replaceFromElement( $$( '.follow-button .button-text' ), { 'Follow': 'Follow', 'Unfollow': 'Unfollow' } );
		stringToElement( $$( '.status-toggle-group .status-text' )[0], 'Today' );
		stringToElement( $$( '.status-toggle-group .status-text' )[1], 'Upcoming' );
		stringToElement( $$( '.status-toggle-group .status-text' )[2], 'Later' );
		stringToElement( $( 'delete_items' ), 'DeleteTask' );
		stringToElement( $( 'make_priority_heading' ), 'MakePriorityHeading' );
		stringToElement( $$( '.details-pane-title .header-name' )[2], 'NewItem', 'placeholder' );
		stringToElement( $$( '.assign-to-me-button .button-text' ), 'AssignToMe' );
		stringToElement( $$( '.assignee-field-name' ), 'Assignee' );
		stringToElement( $( 'assignee_popup_typeahead_input' ), 'NameOrEmail', 'placeholder' );
		stringToElement( $$( '.assigned_to .placeholder' ), 'AssignToTeammate' );
		stringToElement( $$( '.comments .section-name' ), 'ActivityFeed' );
		stringToElement( $$( '.comment-placeholder' ), 'Comment' );

		stringToElement( $$( '#ical' ), 'ICal' );
		stringToElement( $$( '#print' ), 'Print' );
		stringToElement( $$( '#duplicate_project' ), 'DuplicateProject' );
		stringToElement( $$( '#task_creation_email .dropdown-menu-item-label' ), 'AddTasksByEmail' );
		stringToElement( $$( '#set_archived_pot' ), 'ArchiveProject' );
		stringToElement( $$( '#delete_pot' ), 'DeleteProject' );
		stringToElement( $$( '#convert_pot' ), 'ConvertProjectToTag' );
		stringToElement( $$( '#details_property_sheet__new_comment_button .button-text' ), 'BUTTON_Comment' );
		
		stringToElement( $$( '.nothing-selected-text' ), 'NothingSelected' ); // en: Select a task to view its details. Displays in right pane when no task is selected

		// Task activity
		replaceFromElement( $$( '.comments .feed-story .comment-text' ), {
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
			//'attached': 'ACT_Attached' //cant figure out how to make "attached" this translatable.
			//'changed the description.': 'ACT_ChangedDescription', //cant figure out how to make this translatable.
		});
		replaceFromElement( $$( '.comment-content' ), { ' completed this task': 'ACT_MarkedComplete' } );
		

		// Project tasks
		// replaceFromElement( $$( '.upcoming_group .group_header' ), { 'Upcoming': 'Upcoming' }); // Crashes ASANA
		// replaceFromElement( $$( '.today_group .group_header' ), { 'Today': 'Today' }); // Crashes ASANA
		stringToElement( $$( '.all-my-tasks-bar .label' ), 'LATER' );
		replaceFromElement( $$( '.grid_due_date' ), days );
		stringToElement( $$( '.grid_pseudorow_no_prioritized .grid_cell_string' ), 'AddTask' );
		stringToElement( $$( '#archive_menu .new-button-text' ), 'Archive' );
		stringToElement( $( 'archive_menu_item' ), 'ArchiveCompletedTasks' );
		replaceFromElement( $( 'toggle_archived_menu_item' ), { 'Show archived tasks': 'ShowArchivedTasks', 'Hide archived tasks': 'HideArchivedTasks' } );
		stringToElement( $$( '#new_menu .new-button-text' ), 'New' );
		stringToElement( $( 'new_menu_item_new_task' ), 'NewTask' );
		stringToElement( $( 'new_menu_item_new_priority_heading' ), 'NewPriorityHeading' );
		stringToElement( $$( '#project_share_button .button-text' ), 'Share' );
		stringToElement( $$( '.share-dropdown-members .header' ), 'MEMBERS' );
		stringToElement( $$( '.share-dropdown-footer .header' ), 'ShareWithAnotherPerson' );
		replaceFromElement( $$( '.collapse-expand-all .button-text' ), { 'Collapse All': 'CollapseAll', 'Expand All': 'ExpandAll' } );
		stringToElement( $$( '#group_by_priority .button-text' ), 'Priority' );
		stringToElement( $$( '#group_by_assignee .button-text' ), 'Assignee' );
		stringToElement( $$( '#group_by_due_date .button-text' ), 'Date' );
		stringToElement( $$( '#group_by_project .button-text' ), 'Project' );
		stringToElement( $$( '.filter-buttons > .toggle-button > .button-text' ), 'All' );
		stringToElement( $$( '#project_notes .description-placeholder' ), 'AddADescription' );
		stringToElement( $$( '.sort-button .new-button-text' ), 'Sort' );
		stringToElement( $$( '.filter-button .new-button-text' ), 'Filter' );
		replaceFromElement( $( 'pot_groupby_menu_dropdown_menu' ), {
			'Priority': 'Priority',
			'Assignee': 'Assignee',
			'Project': 'Project',
			'Date': 'Date'
		} );
		
		

		// Tips info
		replaceFromElement( $$( '.tooltip-body' ), {
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
		stringToElement( $$( '#new_button .key-action' ), 'NewTask' );
		stringToElement( $$( '.key-action:contains("Mark Complete")' ), 'MarkComplete' );
		stringToElement( $$( '#delete_button .key-action' ), 'DeleteTask' );
		stringToElement( $$( '.key-action:contains("Move Down")' ), 'MoveDown' );
		stringToElement( $$( '.key-action:contains("Jump Down")' ), 'JumpDown' );
		stringToElement( $$( '#close_details_button .key-action' ), 'CloseDetails' );
		stringToElement( $$( '#quick_add_button .key-action' ), 'QuickAdd' );
		stringToElement( $( 'more_shortcuts_link' ), 'More' );

		console.timeEnd( "Asana translate:" );

	};

// This is the request that sends the background.js
chrome.extension.onRequest.addListener( function () {
	translate();
} );

} ( document ) );