import {Injectable} from '@angular/core';

@Injectable()
export class Config  {

  public appName: string = 'client';

  // Events used in the application
  // ----------------------------------------------------------------------------------------------
  public eventNames = {
    userLoggedIn: 'account:loggedInEvent',
    userLoggedOut: 'account:loggedOutEvent',
    userProfileChanged: 'user:profileChangedEvent',
    select: 'button:select',
    redirectLogin: 'redirect:login',
  };

  // Strings used in the application
  // ----------------------------------------------------------------------------------------------
  public okResponseStatus: string = 'ok';
  public errorResponseStatus: string = 'error';

  public errorMessage: string = 'An error has occurred';

  public errorTitle = 'Error';
  public successTitle = 'Success';

  public loadingMessages = {
    // Posts
    posts: 'Loading posts...',
    postSearch: 'Searching posts...',
    postDetails: 'Getting post details...',
    uploadingPost: 'Uploading video, please wait...',
    deletePost: 'Removing post...',
    editPost: 'Saving changes...',
    reportPost: 'Reporting post...',
    ownPosts: 'Loading your posts...',

    // Notifications
    notifications: 'Getting notifications...',

    // Categories
    categories: 'Getting categories...',

    // Account
    login: 'Logging in...',
    register: 'Creating your account...',

    // Profile
    editProfile: 'Saving your changes...',
    profileDetails: 'Getting profile details...',
    profilePicture: 'Uploading picture, please wait...',
  };

  public errorMessages = {
    // Posts
    posts: 'Error retrieving posts. Please try again later',
    postDetails: 'Error retrieving the post details. Please try again later',
    deletePost: 'Error retrieving removing the post. Please try again later',
    editPost: 'Error saving the changes in the post. Please try again later',
    uploadingPost: 'Error uploading the post. Please try again later',

    favorites: 'Error getting your favorites. Please try again later',
    ownPosts: 'Error getting your posts. Please try again later',

    // Categories
    categories: 'Error retrieving categories. Please try again later',

    // Account
    register: 'Error creating your account. Please try again later',
    authenticated: 'Error authenticated. Username or password is incorrect',
    // Notifications
    getNotifications: 'Error retrieving your notifications. Please try again.',
    deleteNotification: 'Error deleting the notification. Please try again.',

    profileDetails: 'Error retrieving  profile details. Please try again.',

    // Profile
    editProfile: 'Error updating your profile. Please try again.',
    profilePicture: 'Error updating your profile picture. Please try again.',
  };

  public successMessages = {
    // Posts
    uploadingPost: 'Your post was uploaded successfully',
    editPost: 'The post was updated successfully',
    profilePicture: 'Your profile picture has been updated!'
  };

  constructor() {
  }
}
