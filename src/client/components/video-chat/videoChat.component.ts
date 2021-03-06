import { Component } from '@angular/core';
declare var SimpleWebRTC: any;

@Component({
  selector: 'video-chat',
  template: require('./videoChat.template.html')
})
export class VideoChatComponent {
  constructor() {
    var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: '',
    // immediately ask for camera access
    autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom('your awesome room name');
    });

    console.log('Video Chat Component');
    webrtc.on('videoAdded', function (video, peer) {
      console.log('video added ++++++++++++++', peer);
      var remotes = document.getElementById('remotes');
      if (remotes) {
          var container = document.createElement('div');
          container.className = 'videoContainer';
          container.id = 'container_' + webrtc.getDomId(peer);
          container.appendChild(video);

          // suppress contextmenu
          video.oncontextmenu = function () { return false; };

          remotes.appendChild(container);
      }
    });
    webrtc.on('videoRemoved', function (video, peer) {
      console.log('video removed ', peer);
      var remotes = document.getElementById('remotes');
      var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
      if (remotes && el) {
          remotes.removeChild(el);
      }
    });
  }
};


