/*! adapterjs - v0.15.4 - 2019-01-07 */
"use strict";
var AdapterJS = AdapterJS || window.AdapterJS || {};
if (
  ((AdapterJS.options = AdapterJS.options || {}),
  (AdapterJS.options.getAllCams = !!AdapterJS.options.getAllCams),
  (AdapterJS.options.hidePluginInstallPrompt = !!AdapterJS.options
    .hidePluginInstallPrompt),
  (AdapterJS.options.forceSafariPlugin = !!AdapterJS.options.forceSafariPlugin),
  (AdapterJS.VERSION = "0.15.4"),
  (AdapterJS.onwebrtcready =
    AdapterJS.onwebrtcready || function(isUsingPlugin) {}),
  (AdapterJS._onwebrtcreadies = []),
  (AdapterJS.webRTCReady = function(baseCallback) {
    if ("function" != typeof baseCallback)
      throw new Error("Callback provided is not a function");
    var callback = function() {
      "function" == typeof window.require &&
        "function" == typeof AdapterJS._defineMediaSourcePolyfill &&
        AdapterJS._defineMediaSourcePolyfill(),
        baseCallback(null !== AdapterJS.WebRTCPlugin.plugin);
    };
    !0 === AdapterJS.onwebrtcreadyDone
      ? callback()
      : AdapterJS._onwebrtcreadies.push(callback);
  }),
  (AdapterJS.WebRTCPlugin = AdapterJS.WebRTCPlugin || {}),
  (AdapterJS.WebRTCPlugin.pluginInfo = AdapterJS.WebRTCPlugin.pluginInfo || {
    prefix: "Tem",
    plugName: "TemWebRTCPlugin",
    pluginId: "plugin0",
    type: "application/x-temwebrtcplugin",
    onload: "__TemWebRTCReady0",
    portalLink: "https://skylink.io/plugin/",
    downloadLink: null,
    companyName: "Temasys",
    downloadLinks: {
      mac: "https://bit.ly/webrtcpluginpkg",
      win: "https://bit.ly/webrtcpluginmsi"
    }
  }),
  void 0 !== AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks &&
    null !== AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks &&
    (navigator.platform.match(/^Mac/i)
      ? (AdapterJS.WebRTCPlugin.pluginInfo.downloadLink =
          AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks.mac)
      : navigator.platform.match(/^Win/i) &&
        (AdapterJS.WebRTCPlugin.pluginInfo.downloadLink =
          AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks.win)),
  (AdapterJS.WebRTCPlugin.TAGS = {
    NONE: "none",
    AUDIO: "audio",
    VIDEO: "video"
  }),
  (AdapterJS.WebRTCPlugin.pageId = Math.random()
    .toString(36)
    .slice(2)),
  (AdapterJS.WebRTCPlugin.plugin = null),
  (AdapterJS.WebRTCPlugin.setLogLevel = null),
  (AdapterJS.WebRTCPlugin.defineWebRTCInterface = null),
  (AdapterJS.WebRTCPlugin.isPluginInstalled = null),
  (AdapterJS.WebRTCPlugin.pluginInjectionInterval = null),
  (AdapterJS.WebRTCPlugin.injectPlugin = null),
  (AdapterJS.WebRTCPlugin.PLUGIN_STATES = {
    NONE: 0,
    INITIALIZING: 1,
    INJECTING: 2,
    INJECTED: 3,
    READY: 4
  }),
  (AdapterJS.WebRTCPlugin.pluginState =
    AdapterJS.WebRTCPlugin.PLUGIN_STATES.NONE),
  (AdapterJS.onwebrtcreadyDone = !1),
  (AdapterJS.WebRTCPlugin.PLUGIN_LOG_LEVELS = {
    NONE: "NONE",
    ERROR: "ERROR",
    WARNING: "WARNING",
    INFO: "INFO",
    VERBOSE: "VERBOSE",
    SENSITIVE: "SENSITIVE"
  }),
  (AdapterJS.WebRTCPlugin.WaitForPluginReady = null),
  (AdapterJS.WebRTCPlugin.callWhenPluginReady = null),
  (AdapterJS.documentReady = function() {
    return (
      ("interactive" === document.readyState && !!document.body) ||
      "complete" === document.readyState
    );
  }),
  (window.__TemWebRTCReady0 = function() {
    AdapterJS.documentReady()
      ? ((AdapterJS.WebRTCPlugin.pluginState =
          AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY),
        AdapterJS.maybeThroughWebRTCReady())
      : setTimeout(__TemWebRTCReady0, 100);
  }),
  (AdapterJS.maybeThroughWebRTCReady = function() {
    AdapterJS.onwebrtcreadyDone ||
      ((AdapterJS.onwebrtcreadyDone = !0),
      AdapterJS._onwebrtcreadies.length
        ? AdapterJS._onwebrtcreadies.forEach(function(callback) {
            "function" == typeof callback &&
              callback(null !== AdapterJS.WebRTCPlugin.plugin);
          })
        : "function" == typeof AdapterJS.onwebrtcready &&
          AdapterJS.onwebrtcready(null !== AdapterJS.WebRTCPlugin.plugin));
  }),
  (AdapterJS.TEXT = {
    PLUGIN: {
      REQUIRE_INSTALLATION:
        "This website requires you to install a WebRTC-enabling plugin to work on this browser.",
      REQUIRE_RESTART:
        "Your plugin is being downloaded. Please run the installer, and restart your browser to begin using it.",
      NOT_SUPPORTED: "Your browser does not support WebRTC.",
      BUTTON: "Install Now"
    },
    REFRESH: { REQUIRE_REFRESH: "Please refresh page", BUTTON: "Refresh Page" }
  }),
  (AdapterJS._iceConnectionStates = {
    starting: "starting",
    checking: "checking",
    connected: "connected",
    completed: "connected",
    done: "completed",
    disconnected: "disconnected",
    failed: "failed",
    closed: "closed"
  }),
  (AdapterJS._iceConnectionFiredStates = []),
  (AdapterJS.isDefined = null),
  (window.webrtcDetectedType = null),
  (window.MediaStream = "function" == typeof MediaStream ? MediaStream : null),
  (window.RTCPeerConnection =
    "function" == typeof RTCPeerConnection ? RTCPeerConnection : null),
  (window.RTCSessionDescription =
    "function" == typeof RTCSessionDescription ? RTCSessionDescription : null),
  (window.RTCIceCandidate =
    "function" == typeof RTCIceCandidate ? RTCIceCandidate : null),
  (window.getUserMedia =
    "function" == typeof getUserMedia ? getUserMedia : null),
  (window.attachMediaStream = null),
  (window.reattachMediaStream = null),
  (window.webrtcDetectedBrowser = null),
  (window.webrtcDetectedVersion = null),
  (window.webrtcMinimumVersion = null),
  (window.webrtcDetectedDCSupport = null),
  (AdapterJS.parseWebrtcDetectedBrowser = function() {
    var hasMatch = null;
    if (
      (window.opr && opr.addons) ||
      window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0
    )
      (hasMatch = navigator.userAgent.match(/OPR\/(\d+)/i) || []),
        (window.webrtcDetectedBrowser = "opera"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)),
        (window.webrtcMinimumVersion = 26),
        (window.webrtcDetectedType = "webkit"),
        (window.webrtcDetectedDCSupport = "SCTP");
    else if (navigator.userAgent.match(/Bowser\/[0-9.]*/g)) {
      hasMatch = navigator.userAgent.match(/Bowser\/[0-9.]*/g) || [];
      var chromiumVersion = parseInt(
        (navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./i) || [])[2] ||
          "0",
        10
      );
      (window.webrtcDetectedBrowser = "bowser"),
        (window.webrtcDetectedVersion = parseFloat(
          (hasMatch[0] || "0/0").split("/")[1],
          10
        )),
        (window.webrtcMinimumVersion = 0),
        (window.webrtcDetectedType = "webkit"),
        (window.webrtcDetectedDCSupport =
          chromiumVersion > 30 ? "SCTP" : "RTP");
    } else if (navigator.userAgent.indexOf("OPiOS") > 0)
      (hasMatch = navigator.userAgent.match(/OPiOS\/([0-9]+)\./)),
        (window.webrtcDetectedBrowser = "opera"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)),
        (window.webrtcMinimumVersion = 0),
        (window.webrtcDetectedType = null),
        (window.webrtcDetectedDCSupport = null);
    else if (navigator.userAgent.indexOf("CriOS") > 0)
      (hasMatch = navigator.userAgent.match(/CriOS\/([0-9]+)\./) || []),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)),
        (window.webrtcMinimumVersion = 0),
        (window.webrtcDetectedType = null),
        (window.webrtcDetectedBrowser = "chrome"),
        (window.webrtcDetectedDCSupport = null);
    else if (navigator.userAgent.indexOf("FxiOS") > 0)
      (hasMatch = navigator.userAgent.match(/FxiOS\/([0-9]+)\./) || []),
        (window.webrtcDetectedBrowser = "firefox"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)),
        (window.webrtcMinimumVersion = 0),
        (window.webrtcDetectedType = null),
        (window.webrtcDetectedDCSupport = null);
    else if (document.documentMode)
      (hasMatch = /\brv[ :]+(\d+)/g.exec(navigator.userAgent) || []),
        (window.webrtcDetectedBrowser = "IE"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1], 10)),
        (window.webrtcMinimumVersion = 9),
        (window.webrtcDetectedType = "plugin"),
        (window.webrtcDetectedDCSupport = "SCTP"),
        webrtcDetectedVersion ||
          ((hasMatch = /\bMSIE[ :]+(\d+)/g.exec(navigator.userAgent) || []),
          (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)));
    else if (
      window.StyleMedia ||
      navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)
    )
      (hasMatch = navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) || []),
        (window.webrtcDetectedBrowser = "edge"),
        (window.webrtcDetectedVersion = parseFloat(
          (hasMatch[0] || "0/0").split("/")[1],
          10
        )),
        (window.webrtcMinimumVersion = 13.10547),
        (window.webrtcDetectedType = "ms"),
        (window.webrtcDetectedDCSupport = null);
    else if (
      "undefined" != typeof InstallTrigger ||
      navigator.userAgent.indexOf("irefox") > 0
    )
      (hasMatch = navigator.userAgent.match(/Firefox\/([0-9]+)\./) || []),
        (window.webrtcDetectedBrowser = "firefox"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)),
        (window.webrtcMinimumVersion = 33),
        (window.webrtcDetectedType = "moz"),
        (window.webrtcDetectedDCSupport = "SCTP");
    else if (
      (window.chrome && window.chrome.webstore) ||
      navigator.userAgent.indexOf("Chrom") > 0
    )
      (hasMatch = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./i) || []),
        (window.webrtcDetectedBrowser = "chrome"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[2] || "0", 10)),
        (window.webrtcMinimumVersion = 38),
        (window.webrtcDetectedType = "webkit"),
        (window.webrtcDetectedDCSupport =
          window.webrtcDetectedVersion > 30 ? "SCTP" : "RTP");
    else if (
      /constructor/i.test(window.HTMLElement) ||
      (function(p) {
        return "[object SafariRemoteNotification]" === p.toString();
      })(!window.safari || safari.pushNotification) ||
      navigator.userAgent.match(/AppleWebKit\/(\d+)\./) ||
      navigator.userAgent.match(/Version\/(\d+).(\d+)/)
    ) {
      hasMatch = navigator.userAgent.match(/version\/(\d+)\.(\d+)/i) || [];
      var AppleWebKitBuild =
          navigator.userAgent.match(/AppleWebKit\/(\d+)/i) || [],
        isMobile = navigator.userAgent.match(/(iPhone|iPad)/gi),
        hasNativeImpl =
          AppleWebKitBuild.length >= 1 && AppleWebKitBuild[1] >= 604;
      if (
        ((window.webrtcDetectedBrowser = "safari"),
        (window.webrtcDetectedVersion = parseInt(hasMatch[1] || "0", 10)),
        (window.webrtcMinimumVersion = 7),
        isMobile)
      )
        window.webrtcDetectedType = hasNativeImpl ? "AppleWebKit" : null;
      else {
        var majorVersion = window.webrtcDetectedVersion,
          minorVersion = parseInt(hasMatch[2] || "0", 10),
          nativeImplIsOverridable = 11 == majorVersion && minorVersion < 2;
        window.webrtcDetectedType =
          !hasNativeImpl ||
          (AdapterJS.options.forceSafariPlugin && nativeImplIsOverridable)
            ? "plugin"
            : "AppleWebKit";
      }
      window.webrtcDetectedDCSupport = "SCTP";
    }
    (AdapterJS.webrtcDetectedBrowser = window.webrtcDetectedBrowser),
      (AdapterJS.webrtcDetectedVersion = window.webrtcDetectedVersion),
      (AdapterJS.webrtcMinimumVersion = window.webrtcMinimumVersion),
      (AdapterJS.webrtcDetectedType = window.webrtcDetectedType),
      (AdapterJS.webrtcDetectedDCSupport = window.webrtcDetectedDCSupport);
  }),
  (AdapterJS.addEvent = function(elem, evnt, func) {
    elem.addEventListener
      ? elem.addEventListener(evnt, func, !1)
      : elem.attachEvent
      ? elem.attachEvent("on" + evnt, func)
      : (elem[evnt] = func);
  }),
  (AdapterJS.renderNotificationBar = function(
    message,
    buttonText,
    buttonCallback
  ) {
    if (AdapterJS.documentReady()) {
      var w = window,
        i = document.createElement("iframe");
      (i.name = "adapterjs-alert"),
        (i.style.position = "fixed"),
        (i.style.top = "-41px"),
        (i.style.left = 0),
        (i.style.right = 0),
        (i.style.width = "100%"),
        (i.style.height = "40px"),
        (i.style.backgroundColor = "#ffffe1"),
        (i.style.border = "none"),
        (i.style.borderBottom = "1px solid #888888"),
        (i.style.zIndex = "9999999"),
        "string" == typeof i.style.webkitTransition
          ? (i.style.webkitTransition = "all .5s ease-out")
          : "string" == typeof i.style.transition &&
            (i.style.transition = "all .5s ease-out"),
        document.body.appendChild(i);
      var c = i.contentWindow
        ? i.contentWindow
        : i.contentDocument.document
        ? i.contentDocument.document
        : i.contentDocument;
      c.document.open(),
        c.document.write(
          '<span style="display: inline-block; font-family: Helvetica, Arial,sans-serif; font-size: .9rem; padding: 4px; vertical-align: middle; cursor: default;">' +
            message +
            "</span>"
        ),
        buttonText && "function" == typeof buttonCallback
          ? (c.document.write(
              '<button id="okay">' +
                buttonText +
                '</button><button id="cancel">Cancel</button>'
            ),
            c.document.close(),
            AdapterJS.addEvent(
              c.document.getElementById("okay"),
              "click",
              function(e) {
                e.preventDefault();
                try {
                  e.cancelBubble = !0;
                } catch (error) {}
                buttonCallback(e);
              }
            ),
            AdapterJS.addEvent(
              c.document.getElementById("cancel"),
              "click",
              function(e) {
                w.document.body.removeChild(i);
              }
            ))
          : c.document.close(),
        setTimeout(function() {
          "string" == typeof i.style.webkitTransform
            ? (i.style.webkitTransform = "translateY(40px)")
            : "string" == typeof i.style.transform
            ? (i.style.transform = "translateY(40px)")
            : (i.style.top = "0px");
        }, 300);
    }
  }),
  (window.requestUserMedia =
    "function" == typeof requestUserMedia ? requestUserMedia : null),
  AdapterJS.parseWebrtcDetectedBrowser(),
  ["webkit", "moz", "ms", "AppleWebKit"].indexOf(AdapterJS.webrtcDetectedType) >
    -1)
) {
  navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) &&
    window.RTCPeerConnection &&
    (window.msRTCPeerConnection = window.RTCPeerConnection),
    (function(f) {
      if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = f();
      else if ("function" == typeof define && define.amd) define([], f);
      else {
        var g;
        (g =
          "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : this),
          (g.adapter = f());
      }
    })(function() {
      return (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = "function" == typeof require && require;
              if (!u && a) return a(o, !0);
              if (i) return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw ((f.code = "MODULE_NOT_FOUND"), f);
            }
            var l = (n[o] = { exports: {} });
            t[o][0].call(
              l.exports,
              function(e) {
                var n = t[o][1][e];
                return s(n || e);
              },
              l,
              l.exports,
              e,
              t,
              n,
              r
            );
          }
          return n[o].exports;
        }
        for (
          var i = "function" == typeof require && require, o = 0;
          o < r.length;
          o++
        )
          s(r[o]);
        return s;
      })(
        {
          1: [
            function(requirecopy, module, exports) {
              function fixStatsType(stat) {
                return (
                  {
                    inboundrtp: "inbound-rtp",
                    outboundrtp: "outbound-rtp",
                    candidatepair: "candidate-pair",
                    localcandidate: "local-candidate",
                    remotecandidate: "remote-candidate"
                  }[stat.type] || stat.type
                );
              }
              function writeMediaSection(
                transceiver,
                caps,
                type,
                stream,
                dtlsRole
              ) {
                var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
                if (
                  ((sdp += SDPUtils.writeIceParameters(
                    transceiver.iceGatherer.getLocalParameters()
                  )),
                  (sdp += SDPUtils.writeDtlsParameters(
                    transceiver.dtlsTransport.getLocalParameters(),
                    "offer" === type ? "actpass" : dtlsRole || "active"
                  )),
                  (sdp += "a=mid:" + transceiver.mid + "\r\n"),
                  transceiver.rtpSender && transceiver.rtpReceiver
                    ? (sdp += "a=sendrecv\r\n")
                    : transceiver.rtpSender
                    ? (sdp += "a=sendonly\r\n")
                    : transceiver.rtpReceiver
                    ? (sdp += "a=recvonly\r\n")
                    : (sdp += "a=inactive\r\n"),
                  transceiver.rtpSender)
                ) {
                  var trackId =
                    transceiver.rtpSender._initialTrackId ||
                    transceiver.rtpSender.track.id;
                  transceiver.rtpSender._initialTrackId = trackId;
                  var msid =
                    "msid:" +
                    (stream ? stream.id : "-") +
                    " " +
                    trackId +
                    "\r\n";
                  (sdp += "a=" + msid),
                    (sdp +=
                      "a=ssrc:" +
                      transceiver.sendEncodingParameters[0].ssrc +
                      " " +
                      msid),
                    transceiver.sendEncodingParameters[0].rtx &&
                      ((sdp +=
                        "a=ssrc:" +
                        transceiver.sendEncodingParameters[0].rtx.ssrc +
                        " " +
                        msid),
                      (sdp +=
                        "a=ssrc-group:FID " +
                        transceiver.sendEncodingParameters[0].ssrc +
                        " " +
                        transceiver.sendEncodingParameters[0].rtx.ssrc +
                        "\r\n"));
                }
                return (
                  (sdp +=
                    "a=ssrc:" +
                    transceiver.sendEncodingParameters[0].ssrc +
                    " cname:" +
                    SDPUtils.localCName +
                    "\r\n"),
                  transceiver.rtpSender &&
                    transceiver.sendEncodingParameters[0].rtx &&
                    (sdp +=
                      "a=ssrc:" +
                      transceiver.sendEncodingParameters[0].rtx.ssrc +
                      " cname:" +
                      SDPUtils.localCName +
                      "\r\n"),
                  sdp
                );
              }
              function filterIceServers(iceServers, edgeVersion) {
                var hasTurn = !1;
                return (
                  (iceServers = JSON.parse(JSON.stringify(iceServers))),
                  iceServers.filter(function(server) {
                    if (server && (server.urls || server.url)) {
                      var urls = server.urls || server.url;
                      server.url && server.urls;
                      var isString = "string" == typeof urls;
                      return (
                        isString && (urls = [urls]),
                        (urls = urls.filter(function(url) {
                          return 0 !== url.indexOf("turn:") ||
                            -1 === url.indexOf("transport=udp") ||
                            -1 !== url.indexOf("turn:[") ||
                            hasTurn
                            ? 0 === url.indexOf("stun:") &&
                                edgeVersion >= 14393 &&
                                -1 === url.indexOf("?transport=udp")
                            : ((hasTurn = !0), !0);
                        })),
                        delete server.url,
                        (server.urls = isString ? urls[0] : urls),
                        !!urls.length
                      );
                    }
                  })
                );
              }
              function getCommonCapabilities(
                localCapabilities,
                remoteCapabilities
              ) {
                var commonCapabilities = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: []
                  },
                  findCodecByPayloadType = function(pt, codecs) {
                    pt = parseInt(pt, 10);
                    for (var i = 0; i < codecs.length; i++)
                      if (
                        codecs[i].payloadType === pt ||
                        codecs[i].preferredPayloadType === pt
                      )
                        return codecs[i];
                  },
                  rtxCapabilityMatches = function(
                    lRtx,
                    rRtx,
                    lCodecs,
                    rCodecs
                  ) {
                    var lCodec = findCodecByPayloadType(
                        lRtx.parameters.apt,
                        lCodecs
                      ),
                      rCodec = findCodecByPayloadType(
                        rRtx.parameters.apt,
                        rCodecs
                      );
                    return (
                      lCodec &&
                      rCodec &&
                      lCodec.name.toLowerCase() === rCodec.name.toLowerCase()
                    );
                  };
                return (
                  localCapabilities.codecs.forEach(function(lCodec) {
                    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
                      var rCodec = remoteCapabilities.codecs[i];
                      if (
                        lCodec.name.toLowerCase() ===
                          rCodec.name.toLowerCase() &&
                        lCodec.clockRate === rCodec.clockRate
                      ) {
                        if (
                          "rtx" === lCodec.name.toLowerCase() &&
                          lCodec.parameters &&
                          rCodec.parameters.apt &&
                          !rtxCapabilityMatches(
                            lCodec,
                            rCodec,
                            localCapabilities.codecs,
                            remoteCapabilities.codecs
                          )
                        )
                          continue;
                        (rCodec = JSON.parse(JSON.stringify(rCodec))),
                          (rCodec.numChannels = Math.min(
                            lCodec.numChannels,
                            rCodec.numChannels
                          )),
                          commonCapabilities.codecs.push(rCodec),
                          (rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(
                            function(fb) {
                              for (
                                var j = 0;
                                j < lCodec.rtcpFeedback.length;
                                j++
                              )
                                if (
                                  lCodec.rtcpFeedback[j].type === fb.type &&
                                  lCodec.rtcpFeedback[j].parameter ===
                                    fb.parameter
                                )
                                  return !0;
                              return !1;
                            }
                          ));
                        break;
                      }
                    }
                  }),
                  localCapabilities.headerExtensions.forEach(function(
                    lHeaderExtension
                  ) {
                    for (
                      var i = 0;
                      i < remoteCapabilities.headerExtensions.length;
                      i++
                    ) {
                      var rHeaderExtension =
                        remoteCapabilities.headerExtensions[i];
                      if (lHeaderExtension.uri === rHeaderExtension.uri) {
                        commonCapabilities.headerExtensions.push(
                          rHeaderExtension
                        );
                        break;
                      }
                    }
                  }),
                  commonCapabilities
                );
              }
              function isActionAllowedInSignalingState(
                action,
                type,
                signalingState
              ) {
                return (
                  -1 !==
                  {
                    offer: {
                      setLocalDescription: ["stable", "have-local-offer"],
                      setRemoteDescription: ["stable", "have-remote-offer"]
                    },
                    answer: {
                      setLocalDescription: [
                        "have-remote-offer",
                        "have-local-pranswer"
                      ],
                      setRemoteDescription: [
                        "have-local-offer",
                        "have-remote-pranswer"
                      ]
                    }
                  }[type][action].indexOf(signalingState)
                );
              }
              function maybeAddCandidate(iceTransport, candidate) {
                var alreadyAdded = iceTransport
                  .getRemoteCandidates()
                  .find(function(remoteCandidate) {
                    return (
                      candidate.foundation === remoteCandidate.foundation &&
                      candidate.ip === remoteCandidate.ip &&
                      candidate.port === remoteCandidate.port &&
                      candidate.priority === remoteCandidate.priority &&
                      candidate.protocol === remoteCandidate.protocol &&
                      candidate.type === remoteCandidate.type
                    );
                  });
                return (
                  alreadyAdded || iceTransport.addRemoteCandidate(candidate),
                  !alreadyAdded
                );
              }
              function makeError(name, description) {
                var e = new Error(description);
                return (
                  (e.name = name),
                  (e.code = {
                    NotSupportedError: 9,
                    InvalidStateError: 11,
                    InvalidAccessError: 15,
                    TypeError: void 0,
                    OperationError: void 0
                  }[name]),
                  e
                );
              }
              var SDPUtils = requirecopy("sdp");
              module.exports = function(window, edgeVersion) {
                function addTrackToStreamAndFireEvent(track, stream) {
                  stream.addTrack(track),
                    stream.dispatchEvent(
                      new window.MediaStreamTrackEvent("addtrack", {
                        track: track
                      })
                    );
                }
                function removeTrackFromStreamAndFireEvent(track, stream) {
                  stream.removeTrack(track),
                    stream.dispatchEvent(
                      new window.MediaStreamTrackEvent("removetrack", {
                        track: track
                      })
                    );
                }
                function fireAddTrack(pc, track, receiver, streams) {
                  var trackEvent = new Event("track");
                  (trackEvent.track = track),
                    (trackEvent.receiver = receiver),
                    (trackEvent.transceiver = { receiver: receiver }),
                    (trackEvent.streams = streams),
                    window.setTimeout(function() {
                      pc._dispatchEvent("track", trackEvent);
                    });
                }
                var RTCPeerConnection = function(config) {
                  var pc = this,
                    _eventTarget = document.createDocumentFragment();
                  if (
                    ([
                      "addEventListener",
                      "removeEventListener",
                      "dispatchEvent"
                    ].forEach(function(method) {
                      pc[method] = _eventTarget[method].bind(_eventTarget);
                    }),
                    (this.canTrickleIceCandidates = null),
                    (this.needNegotiation = !1),
                    (this.localStreams = []),
                    (this.remoteStreams = []),
                    (this._localDescription = null),
                    (this._remoteDescription = null),
                    (this.signalingState = "stable"),
                    (this.iceConnectionState = "new"),
                    (this.connectionState = "new"),
                    (this.iceGatheringState = "new"),
                    (config = JSON.parse(JSON.stringify(config || {}))),
                    (this.usingBundle = "max-bundle" === config.bundlePolicy),
                    "negotiate" === config.rtcpMuxPolicy)
                  )
                    throw makeError(
                      "NotSupportedError",
                      "rtcpMuxPolicy 'negotiate' is not supported"
                    );
                  switch (
                    (config.rtcpMuxPolicy || (config.rtcpMuxPolicy = "require"),
                    config.iceTransportPolicy)
                  ) {
                    case "all":
                    case "relay":
                      break;
                    default:
                      config.iceTransportPolicy = "all";
                  }
                  switch (config.bundlePolicy) {
                    case "balanced":
                    case "max-compat":
                    case "max-bundle":
                      break;
                    default:
                      config.bundlePolicy = "balanced";
                  }
                  if (
                    ((config.iceServers = filterIceServers(
                      config.iceServers || [],
                      edgeVersion
                    )),
                    (this._iceGatherers = []),
                    config.iceCandidatePoolSize)
                  )
                    for (var i = config.iceCandidatePoolSize; i > 0; i--)
                      this._iceGatherers.push(
                        new window.RTCIceGatherer({
                          iceServers: config.iceServers,
                          gatherPolicy: config.iceTransportPolicy
                        })
                      );
                  else config.iceCandidatePoolSize = 0;
                  (this._config = config),
                    (this.transceivers = []),
                    (this._sdpSessionId = SDPUtils.generateSessionId()),
                    (this._sdpSessionVersion = 0),
                    (this._dtlsRole = void 0),
                    (this._isClosed = !1);
                };
                Object.defineProperty(
                  RTCPeerConnection.prototype,
                  "localDescription",
                  {
                    configurable: !0,
                    get: function() {
                      return this._localDescription;
                    }
                  }
                ),
                  Object.defineProperty(
                    RTCPeerConnection.prototype,
                    "remoteDescription",
                    {
                      configurable: !0,
                      get: function() {
                        return this._remoteDescription;
                      }
                    }
                  ),
                  (RTCPeerConnection.prototype.onicecandidate = null),
                  (RTCPeerConnection.prototype.onaddstream = null),
                  (RTCPeerConnection.prototype.ontrack = null),
                  (RTCPeerConnection.prototype.onremovestream = null),
                  (RTCPeerConnection.prototype.onsignalingstatechange = null),
                  (RTCPeerConnection.prototype.oniceconnectionstatechange = null),
                  (RTCPeerConnection.prototype.onconnectionstatechange = null),
                  (RTCPeerConnection.prototype.onicegatheringstatechange = null),
                  (RTCPeerConnection.prototype.onnegotiationneeded = null),
                  (RTCPeerConnection.prototype.ondatachannel = null),
                  (RTCPeerConnection.prototype._dispatchEvent = function(
                    name,
                    event
                  ) {
                    this._isClosed ||
                      (this.dispatchEvent(event),
                      "function" == typeof this["on" + name] &&
                        this["on" + name](event));
                  }),
                  (RTCPeerConnection.prototype._emitGatheringStateChange = function() {
                    var event = new Event("icegatheringstatechange");
                    this._dispatchEvent("icegatheringstatechange", event);
                  }),
                  (RTCPeerConnection.prototype.getConfiguration = function() {
                    return this._config;
                  }),
                  (RTCPeerConnection.prototype.getLocalStreams = function() {
                    return this.localStreams;
                  }),
                  (RTCPeerConnection.prototype.getRemoteStreams = function() {
                    return this.remoteStreams;
                  }),
                  (RTCPeerConnection.prototype._createTransceiver = function(
                    kind,
                    doNotAdd
                  ) {
                    var hasBundleTransport = this.transceivers.length > 0,
                      transceiver = {
                        track: null,
                        iceGatherer: null,
                        iceTransport: null,
                        dtlsTransport: null,
                        localCapabilities: null,
                        remoteCapabilities: null,
                        rtpSender: null,
                        rtpReceiver: null,
                        kind: kind,
                        mid: null,
                        sendEncodingParameters: null,
                        recvEncodingParameters: null,
                        stream: null,
                        associatedRemoteMediaStreams: [],
                        wantReceive: !0
                      };
                    if (this.usingBundle && hasBundleTransport)
                      (transceiver.iceTransport = this.transceivers[0].iceTransport),
                        (transceiver.dtlsTransport = this.transceivers[0].dtlsTransport);
                    else {
                      var transports = this._createIceAndDtlsTransports();
                      (transceiver.iceTransport = transports.iceTransport),
                        (transceiver.dtlsTransport = transports.dtlsTransport);
                    }
                    return (
                      doNotAdd || this.transceivers.push(transceiver),
                      transceiver
                    );
                  }),
                  (RTCPeerConnection.prototype.addTrack = function(
                    track,
                    stream
                  ) {
                    if (this._isClosed)
                      throw makeError(
                        "InvalidStateError",
                        "Attempted to call addTrack on a closed peerconnection."
                      );
                    if (
                      this.transceivers.find(function(s) {
                        return s.track === track;
                      })
                    )
                      throw makeError(
                        "InvalidAccessError",
                        "Track already exists."
                      );
                    for (
                      var transceiver, i = 0;
                      i < this.transceivers.length;
                      i++
                    )
                      this.transceivers[i].track ||
                        this.transceivers[i].kind !== track.kind ||
                        (transceiver = this.transceivers[i]);
                    return (
                      transceiver ||
                        (transceiver = this._createTransceiver(track.kind)),
                      this._maybeFireNegotiationNeeded(),
                      -1 === this.localStreams.indexOf(stream) &&
                        this.localStreams.push(stream),
                      (transceiver.track = track),
                      (transceiver.stream = stream),
                      (transceiver.rtpSender = new window.RTCRtpSender(
                        track,
                        transceiver.dtlsTransport
                      )),
                      transceiver.rtpSender
                    );
                  }),
                  (RTCPeerConnection.prototype.addStream = function(stream) {
                    var pc = this;
                    if (edgeVersion >= 15025)
                      stream.getTracks().forEach(function(track) {
                        pc.addTrack(track, stream);
                      });
                    else {
                      var clonedStream = stream.clone();
                      stream.getTracks().forEach(function(track, idx) {
                        var clonedTrack = clonedStream.getTracks()[idx];
                        track.addEventListener("enabled", function(event) {
                          clonedTrack.enabled = event.enabled;
                        });
                      }),
                        clonedStream.getTracks().forEach(function(track) {
                          pc.addTrack(track, clonedStream);
                        });
                    }
                  }),
                  (RTCPeerConnection.prototype.removeTrack = function(sender) {
                    if (this._isClosed)
                      throw makeError(
                        "InvalidStateError",
                        "Attempted to call removeTrack on a closed peerconnection."
                      );
                    if (!(sender instanceof window.RTCRtpSender))
                      throw new TypeError(
                        "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."
                      );
                    var transceiver = this.transceivers.find(function(t) {
                      return t.rtpSender === sender;
                    });
                    if (!transceiver)
                      throw makeError(
                        "InvalidAccessError",
                        "Sender was not created by this connection."
                      );
                    var stream = transceiver.stream;
                    transceiver.rtpSender.stop(),
                      (transceiver.rtpSender = null),
                      (transceiver.track = null),
                      (transceiver.stream = null),
                      -1 ===
                        this.transceivers
                          .map(function(t) {
                            return t.stream;
                          })
                          .indexOf(stream) &&
                        this.localStreams.indexOf(stream) > -1 &&
                        this.localStreams.splice(
                          this.localStreams.indexOf(stream),
                          1
                        ),
                      this._maybeFireNegotiationNeeded();
                  }),
                  (RTCPeerConnection.prototype.removeStream = function(stream) {
                    var pc = this;
                    stream.getTracks().forEach(function(track) {
                      var sender = pc.getSenders().find(function(s) {
                        return s.track === track;
                      });
                      sender && pc.removeTrack(sender);
                    });
                  }),
                  (RTCPeerConnection.prototype.getSenders = function() {
                    return this.transceivers
                      .filter(function(transceiver) {
                        return !!transceiver.rtpSender;
                      })
                      .map(function(transceiver) {
                        return transceiver.rtpSender;
                      });
                  }),
                  (RTCPeerConnection.prototype.getReceivers = function() {
                    return this.transceivers
                      .filter(function(transceiver) {
                        return !!transceiver.rtpReceiver;
                      })
                      .map(function(transceiver) {
                        return transceiver.rtpReceiver;
                      });
                  }),
                  (RTCPeerConnection.prototype._createIceGatherer = function(
                    sdpMLineIndex,
                    usingBundle
                  ) {
                    var pc = this;
                    if (usingBundle && sdpMLineIndex > 0)
                      return this.transceivers[0].iceGatherer;
                    if (this._iceGatherers.length)
                      return this._iceGatherers.shift();
                    var iceGatherer = new window.RTCIceGatherer({
                      iceServers: this._config.iceServers,
                      gatherPolicy: this._config.iceTransportPolicy
                    });
                    return (
                      Object.defineProperty(iceGatherer, "state", {
                        value: "new",
                        writable: !0
                      }),
                      (this.transceivers[
                        sdpMLineIndex
                      ].bufferedCandidateEvents = []),
                      (this.transceivers[
                        sdpMLineIndex
                      ].bufferCandidates = function(event) {
                        var end =
                          !event.candidate ||
                          0 === Object.keys(event.candidate).length;
                        (iceGatherer.state = end ? "completed" : "gathering"),
                          null !==
                            pc.transceivers[sdpMLineIndex]
                              .bufferedCandidateEvents &&
                            pc.transceivers[
                              sdpMLineIndex
                            ].bufferedCandidateEvents.push(event);
                      }),
                      iceGatherer.addEventListener(
                        "localcandidate",
                        this.transceivers[sdpMLineIndex].bufferCandidates
                      ),
                      iceGatherer
                    );
                  }),
                  (RTCPeerConnection.prototype._gather = function(
                    mid,
                    sdpMLineIndex
                  ) {
                    var pc = this,
                      iceGatherer = this.transceivers[sdpMLineIndex]
                        .iceGatherer;
                    if (!iceGatherer.onlocalcandidate) {
                      var bufferedCandidateEvents = this.transceivers[
                        sdpMLineIndex
                      ].bufferedCandidateEvents;
                      (this.transceivers[
                        sdpMLineIndex
                      ].bufferedCandidateEvents = null),
                        iceGatherer.removeEventListener(
                          "localcandidate",
                          this.transceivers[sdpMLineIndex].bufferCandidates
                        ),
                        (iceGatherer.onlocalcandidate = function(evt) {
                          if (!(pc.usingBundle && sdpMLineIndex > 0)) {
                            var event = new Event("icecandidate");
                            event.candidate = {
                              sdpMid: mid,
                              sdpMLineIndex: sdpMLineIndex
                            };
                            var cand = evt.candidate,
                              end = !cand || 0 === Object.keys(cand).length;
                            if (end)
                              ("new" !== iceGatherer.state &&
                                "gathering" !== iceGatherer.state) ||
                                (iceGatherer.state = "completed");
                            else {
                              "new" === iceGatherer.state &&
                                (iceGatherer.state = "gathering"),
                                (cand.component = 1),
                                (cand.ufrag = iceGatherer.getLocalParameters().usernameFragment);
                              var serializedCandidate = SDPUtils.writeCandidate(
                                cand
                              );
                              (event.candidate = Object.assign(
                                event.candidate,
                                SDPUtils.parseCandidate(serializedCandidate)
                              )),
                                (event.candidate.candidate = serializedCandidate),
                                (event.candidate.toJSON = function() {
                                  return {
                                    candidate: event.candidate.candidate,
                                    sdpMid: event.candidate.sdpMid,
                                    sdpMLineIndex:
                                      event.candidate.sdpMLineIndex,
                                    usernameFragment:
                                      event.candidate.usernameFragment
                                  };
                                });
                            }
                            var sections = SDPUtils.getMediaSections(
                              pc._localDescription.sdp
                            );
                            (sections[event.candidate.sdpMLineIndex] += end
                              ? "a=end-of-candidates\r\n"
                              : "a=" + event.candidate.candidate + "\r\n"),
                              (pc._localDescription.sdp =
                                SDPUtils.getDescription(
                                  pc._localDescription.sdp
                                ) + sections.join(""));
                            var complete = pc.transceivers.every(function(
                              transceiver
                            ) {
                              return (
                                transceiver.iceGatherer &&
                                "completed" === transceiver.iceGatherer.state
                              );
                            });
                            "gathering" !== pc.iceGatheringState &&
                              ((pc.iceGatheringState = "gathering"),
                              pc._emitGatheringStateChange()),
                              end || pc._dispatchEvent("icecandidate", event),
                              complete &&
                                (pc._dispatchEvent(
                                  "icecandidate",
                                  new Event("icecandidate")
                                ),
                                (pc.iceGatheringState = "complete"),
                                pc._emitGatheringStateChange());
                          }
                        }),
                        window.setTimeout(function() {
                          bufferedCandidateEvents.forEach(function(e) {
                            iceGatherer.onlocalcandidate(e);
                          });
                        }, 0);
                    }
                  }),
                  (RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
                    var pc = this,
                      iceTransport = new window.RTCIceTransport(null);
                    iceTransport.onicestatechange = function() {
                      pc._updateIceConnectionState(),
                        pc._updateConnectionState();
                    };
                    var dtlsTransport = new window.RTCDtlsTransport(
                      iceTransport
                    );
                    return (
                      (dtlsTransport.ondtlsstatechange = function() {
                        pc._updateConnectionState();
                      }),
                      (dtlsTransport.onerror = function() {
                        Object.defineProperty(dtlsTransport, "state", {
                          value: "failed",
                          writable: !0
                        }),
                          pc._updateConnectionState();
                      }),
                      {
                        iceTransport: iceTransport,
                        dtlsTransport: dtlsTransport
                      }
                    );
                  }),
                  (RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
                    sdpMLineIndex
                  ) {
                    var iceGatherer = this.transceivers[sdpMLineIndex]
                      .iceGatherer;
                    iceGatherer &&
                      (delete iceGatherer.onlocalcandidate,
                      delete this.transceivers[sdpMLineIndex].iceGatherer);
                    var iceTransport = this.transceivers[sdpMLineIndex]
                      .iceTransport;
                    iceTransport &&
                      (delete iceTransport.onicestatechange,
                      delete this.transceivers[sdpMLineIndex].iceTransport);
                    var dtlsTransport = this.transceivers[sdpMLineIndex]
                      .dtlsTransport;
                    dtlsTransport &&
                      (delete dtlsTransport.ondtlsstatechange,
                      delete dtlsTransport.onerror,
                      delete this.transceivers[sdpMLineIndex].dtlsTransport);
                  }),
                  (RTCPeerConnection.prototype._transceive = function(
                    transceiver,
                    send,
                    recv
                  ) {
                    var params = getCommonCapabilities(
                      transceiver.localCapabilities,
                      transceiver.remoteCapabilities
                    );
                    send &&
                      transceiver.rtpSender &&
                      ((params.encodings = transceiver.sendEncodingParameters),
                      (params.rtcp = {
                        cname: SDPUtils.localCName,
                        compound: transceiver.rtcpParameters.compound
                      }),
                      transceiver.recvEncodingParameters.length &&
                        (params.rtcp.ssrc =
                          transceiver.recvEncodingParameters[0].ssrc),
                      transceiver.rtpSender.send(params)),
                      recv &&
                        transceiver.rtpReceiver &&
                        params.codecs.length > 0 &&
                        ("video" === transceiver.kind &&
                          transceiver.recvEncodingParameters &&
                          edgeVersion < 15019 &&
                          transceiver.recvEncodingParameters.forEach(function(
                            p
                          ) {
                            delete p.rtx;
                          }),
                        transceiver.recvEncodingParameters.length
                          ? (params.encodings =
                              transceiver.recvEncodingParameters)
                          : (params.encodings = [{}]),
                        (params.rtcp = {
                          compound: transceiver.rtcpParameters.compound
                        }),
                        transceiver.rtcpParameters.cname &&
                          (params.rtcp.cname =
                            transceiver.rtcpParameters.cname),
                        transceiver.sendEncodingParameters.length &&
                          (params.rtcp.ssrc =
                            transceiver.sendEncodingParameters[0].ssrc),
                        transceiver.rtpReceiver.receive(params));
                  }),
                  (RTCPeerConnection.prototype.setLocalDescription = function(
                    description
                  ) {
                    var pc = this;
                    if (-1 === ["offer", "answer"].indexOf(description.type))
                      return Promise.reject(
                        makeError(
                          "TypeError",
                          'Unsupported type "' + description.type + '"'
                        )
                      );
                    if (
                      !isActionAllowedInSignalingState(
                        "setLocalDescription",
                        description.type,
                        pc.signalingState
                      ) ||
                      pc._isClosed
                    )
                      return Promise.reject(
                        makeError(
                          "InvalidStateError",
                          "Can not set local " +
                            description.type +
                            " in state " +
                            pc.signalingState
                        )
                      );
                    var sections, sessionpart;
                    if ("offer" === description.type)
                      (sections = SDPUtils.splitSections(description.sdp)),
                        (sessionpart = sections.shift()),
                        sections.forEach(function(mediaSection, sdpMLineIndex) {
                          var caps = SDPUtils.parseRtpParameters(mediaSection);
                          pc.transceivers[
                            sdpMLineIndex
                          ].localCapabilities = caps;
                        }),
                        pc.transceivers.forEach(function(
                          transceiver,
                          sdpMLineIndex
                        ) {
                          pc._gather(transceiver.mid, sdpMLineIndex);
                        });
                    else if ("answer" === description.type) {
                      (sections = SDPUtils.splitSections(
                        pc._remoteDescription.sdp
                      )),
                        (sessionpart = sections.shift());
                      var isIceLite =
                        SDPUtils.matchPrefix(sessionpart, "a=ice-lite").length >
                        0;
                      sections.forEach(function(mediaSection, sdpMLineIndex) {
                        var transceiver = pc.transceivers[sdpMLineIndex],
                          iceGatherer = transceiver.iceGatherer,
                          iceTransport = transceiver.iceTransport,
                          dtlsTransport = transceiver.dtlsTransport,
                          localCapabilities = transceiver.localCapabilities,
                          remoteCapabilities = transceiver.remoteCapabilities;
                        if (
                          !(
                            (SDPUtils.isRejected(mediaSection) &&
                              0 ===
                                SDPUtils.matchPrefix(
                                  mediaSection,
                                  "a=bundle-only"
                                ).length) ||
                            transceiver.rejected
                          )
                        ) {
                          var remoteIceParameters = SDPUtils.getIceParameters(
                              mediaSection,
                              sessionpart
                            ),
                            remoteDtlsParameters = SDPUtils.getDtlsParameters(
                              mediaSection,
                              sessionpart
                            );
                          isIceLite && (remoteDtlsParameters.role = "server"),
                            (pc.usingBundle && 0 !== sdpMLineIndex) ||
                              (pc._gather(transceiver.mid, sdpMLineIndex),
                              "new" === iceTransport.state &&
                                iceTransport.start(
                                  iceGatherer,
                                  remoteIceParameters,
                                  isIceLite ? "controlling" : "controlled"
                                ),
                              "new" === dtlsTransport.state &&
                                dtlsTransport.start(remoteDtlsParameters));
                          var params = getCommonCapabilities(
                            localCapabilities,
                            remoteCapabilities
                          );
                          pc._transceive(
                            transceiver,
                            params.codecs.length > 0,
                            !1
                          );
                        }
                      });
                    }
                    return (
                      (pc._localDescription = {
                        type: description.type,
                        sdp: description.sdp
                      }),
                      "offer" === description.type
                        ? pc._updateSignalingState("have-local-offer")
                        : pc._updateSignalingState("stable"),
                      Promise.resolve()
                    );
                  }),
                  (RTCPeerConnection.prototype.setRemoteDescription = function(
                    description
                  ) {
                    var pc = this;
                    if (-1 === ["offer", "answer"].indexOf(description.type))
                      return Promise.reject(
                        makeError(
                          "TypeError",
                          'Unsupported type "' + description.type + '"'
                        )
                      );
                    if (
                      !isActionAllowedInSignalingState(
                        "setRemoteDescription",
                        description.type,
                        pc.signalingState
                      ) ||
                      pc._isClosed
                    )
                      return Promise.reject(
                        makeError(
                          "InvalidStateError",
                          "Can not set remote " +
                            description.type +
                            " in state " +
                            pc.signalingState
                        )
                      );
                    var streams = {};
                    pc.remoteStreams.forEach(function(stream) {
                      streams[stream.id] = stream;
                    });
                    var receiverList = [],
                      sections = SDPUtils.splitSections(description.sdp),
                      sessionpart = sections.shift(),
                      isIceLite =
                        SDPUtils.matchPrefix(sessionpart, "a=ice-lite").length >
                        0,
                      usingBundle =
                        SDPUtils.matchPrefix(sessionpart, "a=group:BUNDLE ")
                          .length > 0;
                    pc.usingBundle = usingBundle;
                    var iceOptions = SDPUtils.matchPrefix(
                      sessionpart,
                      "a=ice-options:"
                    )[0];
                    return (
                      (pc.canTrickleIceCandidates =
                        !!iceOptions &&
                        iceOptions
                          .substr(14)
                          .split(" ")
                          .indexOf("trickle") >= 0),
                      sections.forEach(function(mediaSection, sdpMLineIndex) {
                        var lines = SDPUtils.splitLines(mediaSection),
                          kind = SDPUtils.getKind(mediaSection),
                          rejected =
                            SDPUtils.isRejected(mediaSection) &&
                            0 ===
                              SDPUtils.matchPrefix(
                                mediaSection,
                                "a=bundle-only"
                              ).length,
                          protocol = lines[0].substr(2).split(" ")[2],
                          direction = SDPUtils.getDirection(
                            mediaSection,
                            sessionpart
                          ),
                          remoteMsid = SDPUtils.parseMsid(mediaSection),
                          mid =
                            SDPUtils.getMid(mediaSection) ||
                            SDPUtils.generateIdentifier();
                        if (
                          rejected ||
                          ("application" === kind &&
                            ("DTLS/SCTP" === protocol ||
                              "UDP/DTLS/SCTP" === protocol))
                        )
                          return void (pc.transceivers[sdpMLineIndex] = {
                            mid: mid,
                            kind: kind,
                            protocol: protocol,
                            rejected: !0
                          });
                        !rejected &&
                          pc.transceivers[sdpMLineIndex] &&
                          pc.transceivers[sdpMLineIndex].rejected &&
                          (pc.transceivers[
                            sdpMLineIndex
                          ] = pc._createTransceiver(kind, !0));
                        var transceiver,
                          iceGatherer,
                          iceTransport,
                          dtlsTransport,
                          rtpReceiver,
                          sendEncodingParameters,
                          recvEncodingParameters,
                          localCapabilities,
                          track,
                          remoteIceParameters,
                          remoteDtlsParameters,
                          remoteCapabilities = SDPUtils.parseRtpParameters(
                            mediaSection
                          );
                        rejected ||
                          ((remoteIceParameters = SDPUtils.getIceParameters(
                            mediaSection,
                            sessionpart
                          )),
                          (remoteDtlsParameters = SDPUtils.getDtlsParameters(
                            mediaSection,
                            sessionpart
                          )),
                          (remoteDtlsParameters.role = "client")),
                          (recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(
                            mediaSection
                          ));
                        var rtcpParameters = SDPUtils.parseRtcpParameters(
                            mediaSection
                          ),
                          isComplete =
                            SDPUtils.matchPrefix(
                              mediaSection,
                              "a=end-of-candidates",
                              sessionpart
                            ).length > 0,
                          cands = SDPUtils.matchPrefix(
                            mediaSection,
                            "a=candidate:"
                          )
                            .map(function(cand) {
                              return SDPUtils.parseCandidate(cand);
                            })
                            .filter(function(cand) {
                              return 1 === cand.component;
                            });
                        if (
                          (("offer" === description.type ||
                            "answer" === description.type) &&
                            !rejected &&
                            usingBundle &&
                            sdpMLineIndex > 0 &&
                            pc.transceivers[sdpMLineIndex] &&
                            (pc._disposeIceAndDtlsTransports(sdpMLineIndex),
                            (pc.transceivers[sdpMLineIndex].iceGatherer =
                              pc.transceivers[0].iceGatherer),
                            (pc.transceivers[sdpMLineIndex].iceTransport =
                              pc.transceivers[0].iceTransport),
                            (pc.transceivers[sdpMLineIndex].dtlsTransport =
                              pc.transceivers[0].dtlsTransport),
                            pc.transceivers[sdpMLineIndex].rtpSender &&
                              pc.transceivers[
                                sdpMLineIndex
                              ].rtpSender.setTransport(
                                pc.transceivers[0].dtlsTransport
                              ),
                            pc.transceivers[sdpMLineIndex].rtpReceiver &&
                              pc.transceivers[
                                sdpMLineIndex
                              ].rtpReceiver.setTransport(
                                pc.transceivers[0].dtlsTransport
                              )),
                          "offer" !== description.type || rejected)
                        )
                          "answer" !== description.type ||
                            rejected ||
                            ((transceiver = pc.transceivers[sdpMLineIndex]),
                            (iceGatherer = transceiver.iceGatherer),
                            (iceTransport = transceiver.iceTransport),
                            (dtlsTransport = transceiver.dtlsTransport),
                            (rtpReceiver = transceiver.rtpReceiver),
                            (sendEncodingParameters =
                              transceiver.sendEncodingParameters),
                            (localCapabilities = transceiver.localCapabilities),
                            (pc.transceivers[
                              sdpMLineIndex
                            ].recvEncodingParameters = recvEncodingParameters),
                            (pc.transceivers[
                              sdpMLineIndex
                            ].remoteCapabilities = remoteCapabilities),
                            (pc.transceivers[
                              sdpMLineIndex
                            ].rtcpParameters = rtcpParameters),
                            cands.length &&
                              "new" === iceTransport.state &&
                              ((!isIceLite && !isComplete) ||
                              (usingBundle && 0 !== sdpMLineIndex)
                                ? cands.forEach(function(candidate) {
                                    maybeAddCandidate(
                                      transceiver.iceTransport,
                                      candidate
                                    );
                                  })
                                : iceTransport.setRemoteCandidates(cands)),
                            (usingBundle && 0 !== sdpMLineIndex) ||
                              ("new" === iceTransport.state &&
                                iceTransport.start(
                                  iceGatherer,
                                  remoteIceParameters,
                                  "controlling"
                                ),
                              "new" === dtlsTransport.state &&
                                dtlsTransport.start(remoteDtlsParameters)),
                            pc._transceive(
                              transceiver,
                              "sendrecv" === direction ||
                                "recvonly" === direction,
                              "sendrecv" === direction ||
                                "sendonly" === direction
                            ),
                            !rtpReceiver ||
                            ("sendrecv" !== direction &&
                              "sendonly" !== direction)
                              ? delete transceiver.rtpReceiver
                              : ((track = rtpReceiver.track),
                                remoteMsid
                                  ? (streams[remoteMsid.stream] ||
                                      (streams[
                                        remoteMsid.stream
                                      ] = new window.MediaStream()),
                                    addTrackToStreamAndFireEvent(
                                      track,
                                      streams[remoteMsid.stream]
                                    ),
                                    receiverList.push([
                                      track,
                                      rtpReceiver,
                                      streams[remoteMsid.stream]
                                    ]))
                                  : (streams.default ||
                                      (streams.default = new window.MediaStream()),
                                    addTrackToStreamAndFireEvent(
                                      track,
                                      streams.default
                                    ),
                                    receiverList.push([
                                      track,
                                      rtpReceiver,
                                      streams.default
                                    ]))));
                        else {
                          (transceiver =
                            pc.transceivers[sdpMLineIndex] ||
                            pc._createTransceiver(kind)),
                            (transceiver.mid = mid),
                            transceiver.iceGatherer ||
                              (transceiver.iceGatherer = pc._createIceGatherer(
                                sdpMLineIndex,
                                usingBundle
                              )),
                            cands.length &&
                              "new" === transceiver.iceTransport.state &&
                              (!isComplete ||
                              (usingBundle && 0 !== sdpMLineIndex)
                                ? cands.forEach(function(candidate) {
                                    maybeAddCandidate(
                                      transceiver.iceTransport,
                                      candidate
                                    );
                                  })
                                : transceiver.iceTransport.setRemoteCandidates(
                                    cands
                                  )),
                            (localCapabilities = window.RTCRtpReceiver.getCapabilities(
                              kind
                            )),
                            edgeVersion < 15019 &&
                              (localCapabilities.codecs = localCapabilities.codecs.filter(
                                function(codec) {
                                  return "rtx" !== codec.name;
                                }
                              )),
                            (sendEncodingParameters = transceiver.sendEncodingParameters || [
                              { ssrc: 1001 * (2 * sdpMLineIndex + 2) }
                            ]);
                          var isNewTrack = !1;
                          if (
                            "sendrecv" === direction ||
                            "sendonly" === direction
                          ) {
                            if (
                              ((isNewTrack = !transceiver.rtpReceiver),
                              (rtpReceiver =
                                transceiver.rtpReceiver ||
                                new window.RTCRtpReceiver(
                                  transceiver.dtlsTransport,
                                  kind
                                )),
                              isNewTrack)
                            ) {
                              var stream;
                              (track = rtpReceiver.track),
                                (remoteMsid && "-" === remoteMsid.stream) ||
                                  (remoteMsid
                                    ? (streams[remoteMsid.stream] ||
                                        ((streams[
                                          remoteMsid.stream
                                        ] = new window.MediaStream()),
                                        Object.defineProperty(
                                          streams[remoteMsid.stream],
                                          "id",
                                          {
                                            get: function() {
                                              return remoteMsid.stream;
                                            }
                                          }
                                        )),
                                      Object.defineProperty(track, "id", {
                                        get: function() {
                                          return remoteMsid.track;
                                        }
                                      }),
                                      (stream = streams[remoteMsid.stream]))
                                    : (streams.default ||
                                        (streams.default = new window.MediaStream()),
                                      (stream = streams.default))),
                                stream &&
                                  (addTrackToStreamAndFireEvent(track, stream),
                                  transceiver.associatedRemoteMediaStreams.push(
                                    stream
                                  )),
                                receiverList.push([track, rtpReceiver, stream]);
                            }
                          } else
                            transceiver.rtpReceiver &&
                              transceiver.rtpReceiver.track &&
                              (transceiver.associatedRemoteMediaStreams.forEach(
                                function(s) {
                                  var nativeTrack = s
                                    .getTracks()
                                    .find(function(t) {
                                      return (
                                        t.id ===
                                        transceiver.rtpReceiver.track.id
                                      );
                                    });
                                  nativeTrack &&
                                    removeTrackFromStreamAndFireEvent(
                                      nativeTrack,
                                      s
                                    );
                                }
                              ),
                              (transceiver.associatedRemoteMediaStreams = []));
                          (transceiver.localCapabilities = localCapabilities),
                            (transceiver.remoteCapabilities = remoteCapabilities),
                            (transceiver.rtpReceiver = rtpReceiver),
                            (transceiver.rtcpParameters = rtcpParameters),
                            (transceiver.sendEncodingParameters = sendEncodingParameters),
                            (transceiver.recvEncodingParameters = recvEncodingParameters),
                            pc._transceive(
                              pc.transceivers[sdpMLineIndex],
                              !1,
                              isNewTrack
                            );
                        }
                      }),
                      void 0 === pc._dtlsRole &&
                        (pc._dtlsRole =
                          "offer" === description.type ? "active" : "passive"),
                      (pc._remoteDescription = {
                        type: description.type,
                        sdp: description.sdp
                      }),
                      "offer" === description.type
                        ? pc._updateSignalingState("have-remote-offer")
                        : pc._updateSignalingState("stable"),
                      Object.keys(streams).forEach(function(sid) {
                        var stream = streams[sid];
                        if (stream.getTracks().length) {
                          if (-1 === pc.remoteStreams.indexOf(stream)) {
                            pc.remoteStreams.push(stream);
                            var event = new Event("addstream");
                            (event.stream = stream),
                              window.setTimeout(function() {
                                pc._dispatchEvent("addstream", event);
                              });
                          }
                          receiverList.forEach(function(item) {
                            var track = item[0],
                              receiver = item[1];
                            stream.id === item[2].id &&
                              fireAddTrack(pc, track, receiver, [stream]);
                          });
                        }
                      }),
                      receiverList.forEach(function(item) {
                        item[2] || fireAddTrack(pc, item[0], item[1], []);
                      }),
                      window.setTimeout(function() {
                        pc &&
                          pc.transceivers &&
                          pc.transceivers.forEach(function(transceiver) {
                            transceiver.iceTransport &&
                              "new" === transceiver.iceTransport.state &&
                              transceiver.iceTransport.getRemoteCandidates()
                                .length > 0 &&
                              transceiver.iceTransport.addRemoteCandidate({});
                          });
                      }, 4e3),
                      Promise.resolve()
                    );
                  }),
                  (RTCPeerConnection.prototype.close = function() {
                    this.transceivers.forEach(function(transceiver) {
                      transceiver.iceTransport &&
                        transceiver.iceTransport.stop(),
                        transceiver.dtlsTransport &&
                          transceiver.dtlsTransport.stop(),
                        transceiver.rtpSender && transceiver.rtpSender.stop(),
                        transceiver.rtpReceiver &&
                          transceiver.rtpReceiver.stop();
                    }),
                      (this._isClosed = !0),
                      this._updateSignalingState("closed");
                  }),
                  (RTCPeerConnection.prototype._updateSignalingState = function(
                    newState
                  ) {
                    this.signalingState = newState;
                    var event = new Event("signalingstatechange");
                    this._dispatchEvent("signalingstatechange", event);
                  }),
                  (RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
                    var pc = this;
                    "stable" === this.signalingState &&
                      !0 !== this.needNegotiation &&
                      ((this.needNegotiation = !0),
                      window.setTimeout(function() {
                        if (pc.needNegotiation) {
                          pc.needNegotiation = !1;
                          var event = new Event("negotiationneeded");
                          pc._dispatchEvent("negotiationneeded", event);
                        }
                      }, 0));
                  }),
                  (RTCPeerConnection.prototype._updateIceConnectionState = function() {
                    var newState,
                      states = {
                        new: 0,
                        closed: 0,
                        checking: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                      };
                    if (
                      (this.transceivers.forEach(function(transceiver) {
                        states[transceiver.iceTransport.state]++;
                      }),
                      (newState = "new"),
                      states.failed > 0
                        ? (newState = "failed")
                        : states.checking > 0
                        ? (newState = "checking")
                        : states.disconnected > 0
                        ? (newState = "disconnected")
                        : states.new > 0
                        ? (newState = "new")
                        : states.connected > 0
                        ? (newState = "connected")
                        : states.completed > 0 && (newState = "completed"),
                      newState !== this.iceConnectionState)
                    ) {
                      this.iceConnectionState = newState;
                      var event = new Event("iceconnectionstatechange");
                      this._dispatchEvent("iceconnectionstatechange", event);
                    }
                  }),
                  (RTCPeerConnection.prototype._updateConnectionState = function() {
                    var newState,
                      states = {
                        new: 0,
                        closed: 0,
                        connecting: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                      };
                    if (
                      (this.transceivers.forEach(function(transceiver) {
                        states[transceiver.iceTransport.state]++,
                          states[transceiver.dtlsTransport.state]++;
                      }),
                      (states.connected += states.completed),
                      (newState = "new"),
                      states.failed > 0
                        ? (newState = "failed")
                        : states.connecting > 0
                        ? (newState = "connecting")
                        : states.disconnected > 0
                        ? (newState = "disconnected")
                        : states.new > 0
                        ? (newState = "new")
                        : states.connected > 0 && (newState = "connected"),
                      newState !== this.connectionState)
                    ) {
                      this.connectionState = newState;
                      var event = new Event("connectionstatechange");
                      this._dispatchEvent("connectionstatechange", event);
                    }
                  }),
                  (RTCPeerConnection.prototype.createOffer = function() {
                    var pc = this;
                    if (pc._isClosed)
                      return Promise.reject(
                        makeError(
                          "InvalidStateError",
                          "Can not call createOffer after close"
                        )
                      );
                    var numAudioTracks = pc.transceivers.filter(function(t) {
                        return "audio" === t.kind;
                      }).length,
                      numVideoTracks = pc.transceivers.filter(function(t) {
                        return "video" === t.kind;
                      }).length,
                      offerOptions = arguments[0];
                    if (offerOptions) {
                      if (offerOptions.mandatory || offerOptions.optional)
                        throw new TypeError(
                          "Legacy mandatory/optional constraints not supported."
                        );
                      void 0 !== offerOptions.offerToReceiveAudio &&
                        (numAudioTracks =
                          !0 === offerOptions.offerToReceiveAudio
                            ? 1
                            : !1 === offerOptions.offerToReceiveAudio
                            ? 0
                            : offerOptions.offerToReceiveAudio),
                        void 0 !== offerOptions.offerToReceiveVideo &&
                          (numVideoTracks =
                            !0 === offerOptions.offerToReceiveVideo
                              ? 1
                              : !1 === offerOptions.offerToReceiveVideo
                              ? 0
                              : offerOptions.offerToReceiveVideo);
                    }
                    for (
                      pc.transceivers.forEach(function(transceiver) {
                        "audio" === transceiver.kind
                          ? --numAudioTracks < 0 &&
                            (transceiver.wantReceive = !1)
                          : "video" === transceiver.kind &&
                            --numVideoTracks < 0 &&
                            (transceiver.wantReceive = !1);
                      });
                      numAudioTracks > 0 || numVideoTracks > 0;

                    )
                      numAudioTracks > 0 &&
                        (pc._createTransceiver("audio"), numAudioTracks--),
                        numVideoTracks > 0 &&
                          (pc._createTransceiver("video"), numVideoTracks--);
                    var sdp = SDPUtils.writeSessionBoilerplate(
                      pc._sdpSessionId,
                      pc._sdpSessionVersion++
                    );
                    pc.transceivers.forEach(function(
                      transceiver,
                      sdpMLineIndex
                    ) {
                      var track = transceiver.track,
                        kind = transceiver.kind,
                        mid = transceiver.mid || SDPUtils.generateIdentifier();
                      (transceiver.mid = mid),
                        transceiver.iceGatherer ||
                          (transceiver.iceGatherer = pc._createIceGatherer(
                            sdpMLineIndex,
                            pc.usingBundle
                          ));
                      var localCapabilities = window.RTCRtpSender.getCapabilities(
                        kind
                      );
                      edgeVersion < 15019 &&
                        (localCapabilities.codecs = localCapabilities.codecs.filter(
                          function(codec) {
                            return "rtx" !== codec.name;
                          }
                        )),
                        localCapabilities.codecs.forEach(function(codec) {
                          "H264" === codec.name &&
                            void 0 ===
                              codec.parameters["level-asymmetry-allowed"] &&
                            (codec.parameters["level-asymmetry-allowed"] = "1"),
                            transceiver.remoteCapabilities &&
                              transceiver.remoteCapabilities.codecs &&
                              transceiver.remoteCapabilities.codecs.forEach(
                                function(remoteCodec) {
                                  codec.name.toLowerCase() ===
                                    remoteCodec.name.toLowerCase() &&
                                    codec.clockRate === remoteCodec.clockRate &&
                                    (codec.preferredPayloadType =
                                      remoteCodec.payloadType);
                                }
                              );
                        }),
                        localCapabilities.headerExtensions.forEach(function(
                          hdrExt
                        ) {
                          (
                            (transceiver.remoteCapabilities &&
                              transceiver.remoteCapabilities
                                .headerExtensions) ||
                            []
                          ).forEach(function(rHdrExt) {
                            hdrExt.uri === rHdrExt.uri &&
                              (hdrExt.id = rHdrExt.id);
                          });
                        });
                      var sendEncodingParameters = transceiver.sendEncodingParameters || [
                        { ssrc: 1001 * (2 * sdpMLineIndex + 1) }
                      ];
                      track &&
                        edgeVersion >= 15019 &&
                        "video" === kind &&
                        !sendEncodingParameters[0].rtx &&
                        (sendEncodingParameters[0].rtx = {
                          ssrc: sendEncodingParameters[0].ssrc + 1
                        }),
                        transceiver.wantReceive &&
                          (transceiver.rtpReceiver = new window.RTCRtpReceiver(
                            transceiver.dtlsTransport,
                            kind
                          )),
                        (transceiver.localCapabilities = localCapabilities),
                        (transceiver.sendEncodingParameters = sendEncodingParameters);
                    }),
                      "max-compat" !== pc._config.bundlePolicy &&
                        (sdp +=
                          "a=group:BUNDLE " +
                          pc.transceivers
                            .map(function(t) {
                              return t.mid;
                            })
                            .join(" ") +
                          "\r\n"),
                      (sdp += "a=ice-options:trickle\r\n"),
                      pc.transceivers.forEach(function(
                        transceiver,
                        sdpMLineIndex
                      ) {
                        (sdp += writeMediaSection(
                          transceiver,
                          transceiver.localCapabilities,
                          "offer",
                          transceiver.stream,
                          pc._dtlsRole
                        )),
                          (sdp += "a=rtcp-rsize\r\n"),
                          !transceiver.iceGatherer ||
                            "new" === pc.iceGatheringState ||
                            (0 !== sdpMLineIndex && pc.usingBundle) ||
                            (transceiver.iceGatherer
                              .getLocalCandidates()
                              .forEach(function(cand) {
                                (cand.component = 1),
                                  (sdp +=
                                    "a=" +
                                    SDPUtils.writeCandidate(cand) +
                                    "\r\n");
                              }),
                            "completed" === transceiver.iceGatherer.state &&
                              (sdp += "a=end-of-candidates\r\n"));
                      });
                    var desc = new window.RTCSessionDescription({
                      type: "offer",
                      sdp: sdp
                    });
                    return Promise.resolve(desc);
                  }),
                  (RTCPeerConnection.prototype.createAnswer = function() {
                    var pc = this;
                    if (pc._isClosed)
                      return Promise.reject(
                        makeError(
                          "InvalidStateError",
                          "Can not call createAnswer after close"
                        )
                      );
                    if (
                      "have-remote-offer" !== pc.signalingState &&
                      "have-local-pranswer" !== pc.signalingState
                    )
                      return Promise.reject(
                        makeError(
                          "InvalidStateError",
                          "Can not call createAnswer in signalingState " +
                            pc.signalingState
                        )
                      );
                    var sdp = SDPUtils.writeSessionBoilerplate(
                      pc._sdpSessionId,
                      pc._sdpSessionVersion++
                    );
                    pc.usingBundle &&
                      (sdp +=
                        "a=group:BUNDLE " +
                        pc.transceivers
                          .map(function(t) {
                            return t.mid;
                          })
                          .join(" ") +
                        "\r\n");
                    var mediaSectionsInOffer = SDPUtils.getMediaSections(
                      pc._remoteDescription.sdp
                    ).length;
                    pc.transceivers.forEach(function(
                      transceiver,
                      sdpMLineIndex
                    ) {
                      if (!(sdpMLineIndex + 1 > mediaSectionsInOffer)) {
                        if (transceiver.rejected)
                          return (
                            "application" === transceiver.kind
                              ? "DTLS/SCTP" === transceiver.protocol
                                ? (sdp += "m=application 0 DTLS/SCTP 5000\r\n")
                                : (sdp +=
                                    "m=application 0 " +
                                    transceiver.protocol +
                                    " webrtc-datachannel\r\n")
                              : "audio" === transceiver.kind
                              ? (sdp +=
                                  "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n")
                              : "video" === transceiver.kind &&
                                (sdp +=
                                  "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                            void (sdp +=
                              "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" +
                              transceiver.mid +
                              "\r\n")
                          );
                        if (transceiver.stream) {
                          var localTrack;
                          "audio" === transceiver.kind
                            ? (localTrack = transceiver.stream.getAudioTracks()[0])
                            : "video" === transceiver.kind &&
                              (localTrack = transceiver.stream.getVideoTracks()[0]),
                            localTrack &&
                              edgeVersion >= 15019 &&
                              "video" === transceiver.kind &&
                              !transceiver.sendEncodingParameters[0].rtx &&
                              (transceiver.sendEncodingParameters[0].rtx = {
                                ssrc:
                                  transceiver.sendEncodingParameters[0].ssrc + 1
                              });
                        }
                        var commonCapabilities = getCommonCapabilities(
                          transceiver.localCapabilities,
                          transceiver.remoteCapabilities
                        );
                        !commonCapabilities.codecs.filter(function(c) {
                          return "rtx" === c.name.toLowerCase();
                        }).length &&
                          transceiver.sendEncodingParameters[0].rtx &&
                          delete transceiver.sendEncodingParameters[0].rtx,
                          (sdp += writeMediaSection(
                            transceiver,
                            commonCapabilities,
                            "answer",
                            transceiver.stream,
                            pc._dtlsRole
                          )),
                          transceiver.rtcpParameters &&
                            transceiver.rtcpParameters.reducedSize &&
                            (sdp += "a=rtcp-rsize\r\n");
                      }
                    });
                    var desc = new window.RTCSessionDescription({
                      type: "answer",
                      sdp: sdp
                    });
                    return Promise.resolve(desc);
                  }),
                  (RTCPeerConnection.prototype.addIceCandidate = function(
                    candidate
                  ) {
                    var sections,
                      pc = this;
                    return candidate &&
                      void 0 === candidate.sdpMLineIndex &&
                      !candidate.sdpMid
                      ? Promise.reject(
                          new TypeError("sdpMLineIndex or sdpMid required")
                        )
                      : new Promise(function(resolve, reject) {
                          if (!pc._remoteDescription)
                            return reject(
                              makeError(
                                "InvalidStateError",
                                "Can not add ICE candidate without a remote description"
                              )
                            );
                          if (candidate && "" !== candidate.candidate) {
                            var sdpMLineIndex = candidate.sdpMLineIndex;
                            if (candidate.sdpMid)
                              for (var i = 0; i < pc.transceivers.length; i++)
                                if (
                                  pc.transceivers[i].mid === candidate.sdpMid
                                ) {
                                  sdpMLineIndex = i;
                                  break;
                                }
                            var transceiver = pc.transceivers[sdpMLineIndex];
                            if (!transceiver)
                              return reject(
                                makeError(
                                  "OperationError",
                                  "Can not add ICE candidate"
                                )
                              );
                            if (transceiver.rejected) return resolve();
                            var cand =
                              Object.keys(candidate.candidate).length > 0
                                ? SDPUtils.parseCandidate(candidate.candidate)
                                : {};
                            if (
                              "tcp" === cand.protocol &&
                              (0 === cand.port || 9 === cand.port)
                            )
                              return resolve();
                            if (cand.component && 1 !== cand.component)
                              return resolve();
                            if (
                              (0 === sdpMLineIndex ||
                                (sdpMLineIndex > 0 &&
                                  transceiver.iceTransport !==
                                    pc.transceivers[0].iceTransport)) &&
                              !maybeAddCandidate(transceiver.iceTransport, cand)
                            )
                              return reject(
                                makeError(
                                  "OperationError",
                                  "Can not add ICE candidate"
                                )
                              );
                            var candidateString = candidate.candidate.trim();
                            0 === candidateString.indexOf("a=") &&
                              (candidateString = candidateString.substr(2)),
                              (sections = SDPUtils.getMediaSections(
                                pc._remoteDescription.sdp
                              )),
                              (sections[sdpMLineIndex] +=
                                "a=" +
                                (cand.type
                                  ? candidateString
                                  : "end-of-candidates") +
                                "\r\n"),
                              (pc._remoteDescription.sdp =
                                SDPUtils.getDescription(
                                  pc._remoteDescription.sdp
                                ) + sections.join(""));
                          } else for (var j = 0; j < pc.transceivers.length && (pc.transceivers[j].rejected || (pc.transceivers[j].iceTransport.addRemoteCandidate({}), (sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp)), (sections[j] += "a=end-of-candidates\r\n"), (pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join("")), !pc.usingBundle)); j++);
                          resolve();
                        });
                  }),
                  (RTCPeerConnection.prototype.getStats = function(selector) {
                    if (
                      selector &&
                      selector instanceof window.MediaStreamTrack
                    ) {
                      var senderOrReceiver = null;
                      if (
                        (this.transceivers.forEach(function(transceiver) {
                          transceiver.rtpSender &&
                          transceiver.rtpSender.track === selector
                            ? (senderOrReceiver = transceiver.rtpSender)
                            : transceiver.rtpReceiver &&
                              transceiver.rtpReceiver.track === selector &&
                              (senderOrReceiver = transceiver.rtpReceiver);
                        }),
                        !senderOrReceiver)
                      )
                        throw makeError(
                          "InvalidAccessError",
                          "Invalid selector."
                        );
                      return senderOrReceiver.getStats();
                    }
                    var promises = [];
                    return (
                      this.transceivers.forEach(function(transceiver) {
                        [
                          "rtpSender",
                          "rtpReceiver",
                          "iceGatherer",
                          "iceTransport",
                          "dtlsTransport"
                        ].forEach(function(method) {
                          transceiver[method] &&
                            promises.push(transceiver[method].getStats());
                        });
                      }),
                      Promise.all(promises).then(function(allStats) {
                        var results = new Map();
                        return (
                          allStats.forEach(function(stats) {
                            stats.forEach(function(stat) {
                              results.set(stat.id, stat);
                            });
                          }),
                          results
                        );
                      })
                    );
                  }),
                  [
                    "RTCRtpSender",
                    "RTCRtpReceiver",
                    "RTCIceGatherer",
                    "RTCIceTransport",
                    "RTCDtlsTransport"
                  ].forEach(function(ortcObjectName) {
                    var obj = window[ortcObjectName];
                    if (obj && obj.prototype && obj.prototype.getStats) {
                      var nativeGetstats = obj.prototype.getStats;
                      obj.prototype.getStats = function() {
                        return nativeGetstats
                          .apply(this)
                          .then(function(nativeStats) {
                            var mapStats = new Map();
                            return (
                              Object.keys(nativeStats).forEach(function(id) {
                                (nativeStats[id].type = fixStatsType(
                                  nativeStats[id]
                                )),
                                  mapStats.set(id, nativeStats[id]);
                              }),
                              mapStats
                            );
                          });
                      };
                    }
                  });
                var methods = ["createOffer", "createAnswer"];
                return (
                  methods.forEach(function(method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function() {
                      var args = arguments;
                      return "function" == typeof args[0] ||
                        "function" == typeof args[1]
                        ? nativeMethod.apply(this, [arguments[2]]).then(
                            function(description) {
                              "function" == typeof args[0] &&
                                args[0].apply(null, [description]);
                            },
                            function(error) {
                              "function" == typeof args[1] &&
                                args[1].apply(null, [error]);
                            }
                          )
                        : nativeMethod.apply(this, arguments);
                    };
                  }),
                  (methods = [
                    "setLocalDescription",
                    "setRemoteDescription",
                    "addIceCandidate"
                  ]),
                  methods.forEach(function(method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function() {
                      var args = arguments;
                      return "function" == typeof args[1] ||
                        "function" == typeof args[2]
                        ? nativeMethod.apply(this, arguments).then(
                            function() {
                              "function" == typeof args[1] &&
                                args[1].apply(null);
                            },
                            function(error) {
                              "function" == typeof args[2] &&
                                args[2].apply(null, [error]);
                            }
                          )
                        : nativeMethod.apply(this, arguments);
                    };
                  }),
                  ["getStats"].forEach(function(method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function() {
                      var args = arguments;
                      return "function" == typeof args[1]
                        ? nativeMethod.apply(this, arguments).then(function() {
                            "function" == typeof args[1] && args[1].apply(null);
                          })
                        : nativeMethod.apply(this, arguments);
                    };
                  }),
                  RTCPeerConnection
                );
              };
            },
            { sdp: 2 }
          ],
          2: [
            function(requirecopy, module, exports) {
              var SDPUtils = {};
              (SDPUtils.generateIdentifier = function() {
                return Math.random()
                  .toString(36)
                  .substr(2, 10);
              }),
                (SDPUtils.localCName = SDPUtils.generateIdentifier()),
                (SDPUtils.splitLines = function(blob) {
                  return blob
                    .trim()
                    .split("\n")
                    .map(function(line) {
                      return line.trim();
                    });
                }),
                (SDPUtils.splitSections = function(blob) {
                  return blob.split("\nm=").map(function(part, index) {
                    return (index > 0 ? "m=" + part : part).trim() + "\r\n";
                  });
                }),
                (SDPUtils.getDescription = function(blob) {
                  var sections = SDPUtils.splitSections(blob);
                  return sections && sections[0];
                }),
                (SDPUtils.getMediaSections = function(blob) {
                  var sections = SDPUtils.splitSections(blob);
                  return sections.shift(), sections;
                }),
                (SDPUtils.matchPrefix = function(blob, prefix) {
                  return SDPUtils.splitLines(blob).filter(function(line) {
                    return 0 === line.indexOf(prefix);
                  });
                }),
                (SDPUtils.parseCandidate = function(line) {
                  var parts;
                  parts =
                    0 === line.indexOf("a=candidate:")
                      ? line.substring(12).split(" ")
                      : line.substring(10).split(" ");
                  for (
                    var candidate = {
                        foundation: parts[0],
                        component: parseInt(parts[1], 10),
                        protocol: parts[2].toLowerCase(),
                        priority: parseInt(parts[3], 10),
                        ip: parts[4],
                        port: parseInt(parts[5], 10),
                        type: parts[7]
                      },
                      i = 8;
                    i < parts.length;
                    i += 2
                  )
                    switch (parts[i]) {
                      case "raddr":
                        candidate.relatedAddress = parts[i + 1];
                        break;
                      case "rport":
                        candidate.relatedPort = parseInt(parts[i + 1], 10);
                        break;
                      case "tcptype":
                        candidate.tcpType = parts[i + 1];
                        break;
                      case "ufrag":
                        (candidate.ufrag = parts[i + 1]),
                          (candidate.usernameFragment = parts[i + 1]);
                        break;
                      default:
                        candidate[parts[i]] = parts[i + 1];
                    }
                  return candidate;
                }),
                (SDPUtils.writeCandidate = function(candidate) {
                  var sdp = [];
                  sdp.push(candidate.foundation),
                    sdp.push(candidate.component),
                    sdp.push(candidate.protocol.toUpperCase()),
                    sdp.push(candidate.priority),
                    sdp.push(candidate.ip),
                    sdp.push(candidate.port);
                  var type = candidate.type;
                  return (
                    sdp.push("typ"),
                    sdp.push(type),
                    "host" !== type &&
                      candidate.relatedAddress &&
                      candidate.relatedPort &&
                      (sdp.push("raddr"),
                      sdp.push(candidate.relatedAddress),
                      sdp.push("rport"),
                      sdp.push(candidate.relatedPort)),
                    candidate.tcpType &&
                      "tcp" === candidate.protocol.toLowerCase() &&
                      (sdp.push("tcptype"), sdp.push(candidate.tcpType)),
                    (candidate.usernameFragment || candidate.ufrag) &&
                      (sdp.push("ufrag"),
                      sdp.push(candidate.usernameFragment || candidate.ufrag)),
                    "candidate:" + sdp.join(" ")
                  );
                }),
                (SDPUtils.parseIceOptions = function(line) {
                  return line.substr(14).split(" ");
                }),
                (SDPUtils.parseRtpMap = function(line) {
                  var parts = line.substr(9).split(" "),
                    parsed = { payloadType: parseInt(parts.shift(), 10) };
                  return (
                    (parts = parts[0].split("/")),
                    (parsed.name = parts[0]),
                    (parsed.clockRate = parseInt(parts[1], 10)),
                    (parsed.channels =
                      3 === parts.length ? parseInt(parts[2], 10) : 1),
                    (parsed.numChannels = parsed.channels),
                    parsed
                  );
                }),
                (SDPUtils.writeRtpMap = function(codec) {
                  var pt = codec.payloadType;
                  void 0 !== codec.preferredPayloadType &&
                    (pt = codec.preferredPayloadType);
                  var channels = codec.channels || codec.numChannels || 1;
                  return (
                    "a=rtpmap:" +
                    pt +
                    " " +
                    codec.name +
                    "/" +
                    codec.clockRate +
                    (1 !== channels ? "/" + channels : "") +
                    "\r\n"
                  );
                }),
                (SDPUtils.parseExtmap = function(line) {
                  var parts = line.substr(9).split(" ");
                  return {
                    id: parseInt(parts[0], 10),
                    direction:
                      parts[0].indexOf("/") > 0
                        ? parts[0].split("/")[1]
                        : "sendrecv",
                    uri: parts[1]
                  };
                }),
                (SDPUtils.writeExtmap = function(headerExtension) {
                  return (
                    "a=extmap:" +
                    (headerExtension.id || headerExtension.preferredId) +
                    (headerExtension.direction &&
                    "sendrecv" !== headerExtension.direction
                      ? "/" + headerExtension.direction
                      : "") +
                    " " +
                    headerExtension.uri +
                    "\r\n"
                  );
                }),
                (SDPUtils.parseFmtp = function(line) {
                  for (
                    var kv,
                      parsed = {},
                      parts = line.substr(line.indexOf(" ") + 1).split(";"),
                      j = 0;
                    j < parts.length;
                    j++
                  )
                    (kv = parts[j].trim().split("=")),
                      (parsed[kv[0].trim()] = kv[1]);
                  return parsed;
                }),
                (SDPUtils.writeFmtp = function(codec) {
                  var line = "",
                    pt = codec.payloadType;
                  if (
                    (void 0 !== codec.preferredPayloadType &&
                      (pt = codec.preferredPayloadType),
                    codec.parameters && Object.keys(codec.parameters).length)
                  ) {
                    var params = [];
                    Object.keys(codec.parameters).forEach(function(param) {
                      codec.parameters[param]
                        ? params.push(param + "=" + codec.parameters[param])
                        : params.push(param);
                    }),
                      (line +=
                        "a=fmtp:" + pt + " " + params.join(";") + "\r\n");
                  }
                  return line;
                }),
                (SDPUtils.parseRtcpFb = function(line) {
                  var parts = line.substr(line.indexOf(" ") + 1).split(" ");
                  return { type: parts.shift(), parameter: parts.join(" ") };
                }),
                (SDPUtils.writeRtcpFb = function(codec) {
                  var lines = "",
                    pt = codec.payloadType;
                  return (
                    void 0 !== codec.preferredPayloadType &&
                      (pt = codec.preferredPayloadType),
                    codec.rtcpFeedback &&
                      codec.rtcpFeedback.length &&
                      codec.rtcpFeedback.forEach(function(fb) {
                        lines +=
                          "a=rtcp-fb:" +
                          pt +
                          " " +
                          fb.type +
                          (fb.parameter && fb.parameter.length
                            ? " " + fb.parameter
                            : "") +
                          "\r\n";
                      }),
                    lines
                  );
                }),
                (SDPUtils.parseSsrcMedia = function(line) {
                  var sp = line.indexOf(" "),
                    parts = { ssrc: parseInt(line.substr(7, sp - 7), 10) },
                    colon = line.indexOf(":", sp);
                  return (
                    colon > -1
                      ? ((parts.attribute = line.substr(
                          sp + 1,
                          colon - sp - 1
                        )),
                        (parts.value = line.substr(colon + 1)))
                      : (parts.attribute = line.substr(sp + 1)),
                    parts
                  );
                }),
                (SDPUtils.parseSsrcGroup = function(line) {
                  var parts = line.substr(13).split(" ");
                  return {
                    semantics: parts.shift(),
                    ssrcs: parts.map(function(ssrc) {
                      return parseInt(ssrc, 10);
                    })
                  };
                }),
                (SDPUtils.getMid = function(mediaSection) {
                  var mid = SDPUtils.matchPrefix(mediaSection, "a=mid:")[0];
                  if (mid) return mid.substr(6);
                }),
                (SDPUtils.parseFingerprint = function(line) {
                  var parts = line.substr(14).split(" ");
                  return { algorithm: parts[0].toLowerCase(), value: parts[1] };
                }),
                (SDPUtils.getDtlsParameters = function(
                  mediaSection,
                  sessionpart
                ) {
                  return {
                    role: "auto",
                    fingerprints: SDPUtils.matchPrefix(
                      mediaSection + sessionpart,
                      "a=fingerprint:"
                    ).map(SDPUtils.parseFingerprint)
                  };
                }),
                (SDPUtils.writeDtlsParameters = function(params, setupType) {
                  var sdp = "a=setup:" + setupType + "\r\n";
                  return (
                    params.fingerprints.forEach(function(fp) {
                      sdp +=
                        "a=fingerprint:" +
                        fp.algorithm +
                        " " +
                        fp.value +
                        "\r\n";
                    }),
                    sdp
                  );
                }),
                (SDPUtils.getIceParameters = function(
                  mediaSection,
                  sessionpart
                ) {
                  var lines = SDPUtils.splitLines(mediaSection);
                  return (
                    (lines = lines.concat(SDPUtils.splitLines(sessionpart))),
                    {
                      usernameFragment: lines
                        .filter(function(line) {
                          return 0 === line.indexOf("a=ice-ufrag:");
                        })[0]
                        .substr(12),
                      password: lines
                        .filter(function(line) {
                          return 0 === line.indexOf("a=ice-pwd:");
                        })[0]
                        .substr(10)
                    }
                  );
                }),
                (SDPUtils.writeIceParameters = function(params) {
                  return (
                    "a=ice-ufrag:" +
                    params.usernameFragment +
                    "\r\na=ice-pwd:" +
                    params.password +
                    "\r\n"
                  );
                }),
                (SDPUtils.parseRtpParameters = function(mediaSection) {
                  for (
                    var description = {
                        codecs: [],
                        headerExtensions: [],
                        fecMechanisms: [],
                        rtcp: []
                      },
                      lines = SDPUtils.splitLines(mediaSection),
                      mline = lines[0].split(" "),
                      i = 3;
                    i < mline.length;
                    i++
                  ) {
                    var pt = mline[i],
                      rtpmapline = SDPUtils.matchPrefix(
                        mediaSection,
                        "a=rtpmap:" + pt + " "
                      )[0];
                    if (rtpmapline) {
                      var codec = SDPUtils.parseRtpMap(rtpmapline),
                        fmtps = SDPUtils.matchPrefix(
                          mediaSection,
                          "a=fmtp:" + pt + " "
                        );
                      switch (
                        ((codec.parameters = fmtps.length
                          ? SDPUtils.parseFmtp(fmtps[0])
                          : {}),
                        (codec.rtcpFeedback = SDPUtils.matchPrefix(
                          mediaSection,
                          "a=rtcp-fb:" + pt + " "
                        ).map(SDPUtils.parseRtcpFb)),
                        description.codecs.push(codec),
                        codec.name.toUpperCase())
                      ) {
                        case "RED":
                        case "ULPFEC":
                          description.fecMechanisms.push(
                            codec.name.toUpperCase()
                          );
                      }
                    }
                  }
                  return (
                    SDPUtils.matchPrefix(mediaSection, "a=extmap:").forEach(
                      function(line) {
                        description.headerExtensions.push(
                          SDPUtils.parseExtmap(line)
                        );
                      }
                    ),
                    description
                  );
                }),
                (SDPUtils.writeRtpDescription = function(kind, caps) {
                  var sdp = "";
                  (sdp += "m=" + kind + " "),
                    (sdp += caps.codecs.length > 0 ? "9" : "0"),
                    (sdp += " UDP/TLS/RTP/SAVPF "),
                    (sdp +=
                      caps.codecs
                        .map(function(codec) {
                          return void 0 !== codec.preferredPayloadType
                            ? codec.preferredPayloadType
                            : codec.payloadType;
                        })
                        .join(" ") + "\r\n"),
                    (sdp += "c=IN IP4 0.0.0.0\r\n"),
                    (sdp += "a=rtcp:9 IN IP4 0.0.0.0\r\n"),
                    caps.codecs.forEach(function(codec) {
                      (sdp += SDPUtils.writeRtpMap(codec)),
                        (sdp += SDPUtils.writeFmtp(codec)),
                        (sdp += SDPUtils.writeRtcpFb(codec));
                    });
                  var maxptime = 0;
                  return (
                    caps.codecs.forEach(function(codec) {
                      codec.maxptime > maxptime && (maxptime = codec.maxptime);
                    }),
                    maxptime > 0 && (sdp += "a=maxptime:" + maxptime + "\r\n"),
                    (sdp += "a=rtcp-mux\r\n"),
                    caps.headerExtensions &&
                      caps.headerExtensions.forEach(function(extension) {
                        sdp += SDPUtils.writeExtmap(extension);
                      }),
                    sdp
                  );
                }),
                (SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
                  var secondarySsrc,
                    encodingParameters = [],
                    description = SDPUtils.parseRtpParameters(mediaSection),
                    hasRed = -1 !== description.fecMechanisms.indexOf("RED"),
                    hasUlpfec =
                      -1 !== description.fecMechanisms.indexOf("ULPFEC"),
                    ssrcs = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
                      .map(function(line) {
                        return SDPUtils.parseSsrcMedia(line);
                      })
                      .filter(function(parts) {
                        return "cname" === parts.attribute;
                      }),
                    primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc,
                    flows = SDPUtils.matchPrefix(
                      mediaSection,
                      "a=ssrc-group:FID"
                    ).map(function(line) {
                      return line
                        .substr(17)
                        .split(" ")
                        .map(function(part) {
                          return parseInt(part, 10);
                        });
                    });
                  flows.length > 0 &&
                    flows[0].length > 1 &&
                    flows[0][0] === primarySsrc &&
                    (secondarySsrc = flows[0][1]),
                    description.codecs.forEach(function(codec) {
                      if (
                        "RTX" === codec.name.toUpperCase() &&
                        codec.parameters.apt
                      ) {
                        var encParam = {
                          ssrc: primarySsrc,
                          codecPayloadType: parseInt(codec.parameters.apt, 10)
                        };
                        primarySsrc &&
                          secondarySsrc &&
                          (encParam.rtx = { ssrc: secondarySsrc }),
                          encodingParameters.push(encParam),
                          hasRed &&
                            ((encParam = JSON.parse(JSON.stringify(encParam))),
                            (encParam.fec = {
                              ssrc: secondarySsrc,
                              mechanism: hasUlpfec ? "red+ulpfec" : "red"
                            }),
                            encodingParameters.push(encParam));
                      }
                    }),
                    0 === encodingParameters.length &&
                      primarySsrc &&
                      encodingParameters.push({ ssrc: primarySsrc });
                  var bandwidth = SDPUtils.matchPrefix(mediaSection, "b=");
                  return (
                    bandwidth.length &&
                      ((bandwidth =
                        0 === bandwidth[0].indexOf("b=TIAS:")
                          ? parseInt(bandwidth[0].substr(7), 10)
                          : 0 === bandwidth[0].indexOf("b=AS:")
                          ? 1e3 * parseInt(bandwidth[0].substr(5), 10) * 0.95 -
                            16e3
                          : void 0),
                      encodingParameters.forEach(function(params) {
                        params.maxBitrate = bandwidth;
                      })),
                    encodingParameters
                  );
                }),
                (SDPUtils.parseRtcpParameters = function(mediaSection) {
                  var rtcpParameters = {},
                    remoteSsrc = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
                      .map(function(line) {
                        return SDPUtils.parseSsrcMedia(line);
                      })
                      .filter(function(obj) {
                        return "cname" === obj.attribute;
                      })[0];
                  remoteSsrc &&
                    ((rtcpParameters.cname = remoteSsrc.value),
                    (rtcpParameters.ssrc = remoteSsrc.ssrc));
                  var rsize = SDPUtils.matchPrefix(
                    mediaSection,
                    "a=rtcp-rsize"
                  );
                  (rtcpParameters.reducedSize = rsize.length > 0),
                    (rtcpParameters.compound = 0 === rsize.length);
                  var mux = SDPUtils.matchPrefix(mediaSection, "a=rtcp-mux");
                  return (rtcpParameters.mux = mux.length > 0), rtcpParameters;
                }),
                (SDPUtils.parseMsid = function(mediaSection) {
                  var parts,
                    spec = SDPUtils.matchPrefix(mediaSection, "a=msid:");
                  if (1 === spec.length)
                    return (
                      (parts = spec[0].substr(7).split(" ")),
                      { stream: parts[0], track: parts[1] }
                    );
                  var planB = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
                    .map(function(line) {
                      return SDPUtils.parseSsrcMedia(line);
                    })
                    .filter(function(msidParts) {
                      return "msid" === msidParts.attribute;
                    });
                  return planB.length > 0
                    ? ((parts = planB[0].value.split(" ")),
                      { stream: parts[0], track: parts[1] })
                    : void 0;
                }),
                (SDPUtils.generateSessionId = function() {
                  return Math.random()
                    .toString()
                    .substr(2, 21);
                }),
                (SDPUtils.writeSessionBoilerplate = function(sessId, sessVer) {
                  var version = void 0 !== sessVer ? sessVer : 2;
                  return (
                    "v=0\r\no=thisisadapterortc " +
                    (sessId || SDPUtils.generateSessionId()) +
                    " " +
                    version +
                    " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
                  );
                }),
                (SDPUtils.writeMediaSection = function(
                  transceiver,
                  caps,
                  type,
                  stream
                ) {
                  var sdp = SDPUtils.writeRtpDescription(
                    transceiver.kind,
                    caps
                  );
                  if (
                    ((sdp += SDPUtils.writeIceParameters(
                      transceiver.iceGatherer.getLocalParameters()
                    )),
                    (sdp += SDPUtils.writeDtlsParameters(
                      transceiver.dtlsTransport.getLocalParameters(),
                      "offer" === type ? "actpass" : "active"
                    )),
                    (sdp += "a=mid:" + transceiver.mid + "\r\n"),
                    transceiver.direction
                      ? (sdp += "a=" + transceiver.direction + "\r\n")
                      : transceiver.rtpSender && transceiver.rtpReceiver
                      ? (sdp += "a=sendrecv\r\n")
                      : transceiver.rtpSender
                      ? (sdp += "a=sendonly\r\n")
                      : transceiver.rtpReceiver
                      ? (sdp += "a=recvonly\r\n")
                      : (sdp += "a=inactive\r\n"),
                    transceiver.rtpSender)
                  ) {
                    var msid =
                      "msid:" +
                      stream.id +
                      " " +
                      transceiver.rtpSender.track.id +
                      "\r\n";
                    (sdp += "a=" + msid),
                      (sdp +=
                        "a=ssrc:" +
                        transceiver.sendEncodingParameters[0].ssrc +
                        " " +
                        msid),
                      transceiver.sendEncodingParameters[0].rtx &&
                        ((sdp +=
                          "a=ssrc:" +
                          transceiver.sendEncodingParameters[0].rtx.ssrc +
                          " " +
                          msid),
                        (sdp +=
                          "a=ssrc-group:FID " +
                          transceiver.sendEncodingParameters[0].ssrc +
                          " " +
                          transceiver.sendEncodingParameters[0].rtx.ssrc +
                          "\r\n"));
                  }
                  return (
                    (sdp +=
                      "a=ssrc:" +
                      transceiver.sendEncodingParameters[0].ssrc +
                      " cname:" +
                      SDPUtils.localCName +
                      "\r\n"),
                    transceiver.rtpSender &&
                      transceiver.sendEncodingParameters[0].rtx &&
                      (sdp +=
                        "a=ssrc:" +
                        transceiver.sendEncodingParameters[0].rtx.ssrc +
                        " cname:" +
                        SDPUtils.localCName +
                        "\r\n"),
                    sdp
                  );
                }),
                (SDPUtils.getDirection = function(mediaSection, sessionpart) {
                  for (
                    var lines = SDPUtils.splitLines(mediaSection), i = 0;
                    i < lines.length;
                    i++
                  )
                    switch (lines[i]) {
                      case "a=sendrecv":
                      case "a=sendonly":
                      case "a=recvonly":
                      case "a=inactive":
                        return lines[i].substr(2);
                    }
                  return sessionpart
                    ? SDPUtils.getDirection(sessionpart)
                    : "sendrecv";
                }),
                (SDPUtils.getKind = function(mediaSection) {
                  return SDPUtils.splitLines(mediaSection)[0]
                    .split(" ")[0]
                    .substr(2);
                }),
                (SDPUtils.isRejected = function(mediaSection) {
                  return "0" === mediaSection.split(" ", 2)[1];
                }),
                (SDPUtils.parseMLine = function(mediaSection) {
                  var lines = SDPUtils.splitLines(mediaSection),
                    parts = lines[0].substr(2).split(" ");
                  return {
                    kind: parts[0],
                    port: parseInt(parts[1], 10),
                    protocol: parts[2],
                    fmt: parts.slice(3).join(" ")
                  };
                }),
                (SDPUtils.parseOLine = function(mediaSection) {
                  var line = SDPUtils.matchPrefix(mediaSection, "o=")[0],
                    parts = line.substr(2).split(" ");
                  return {
                    username: parts[0],
                    sessionId: parts[1],
                    sessionVersion: parseInt(parts[2], 10),
                    netType: parts[3],
                    addressType: parts[4],
                    address: parts[5]
                  };
                }),
                (SDPUtils.isValidSDP = function(blob) {
                  if ("string" != typeof blob || 0 === blob.length) return !1;
                  for (
                    var lines = SDPUtils.splitLines(blob), i = 0;
                    i < lines.length;
                    i++
                  )
                    if (lines[i].length < 2 || "=" !== lines[i].charAt(1))
                      return !1;
                  return !0;
                }),
                "object" == typeof module && (module.exports = SDPUtils);
            },
            {}
          ],
          3: [
            function(requirecopy, module, exports) {
              (function(global) {
                var adapterFactory = requirecopy("./adapter_factory.js");
                module.exports = adapterFactory({ window: global.window });
              }.call(
                this,
                "undefined" != typeof global
                  ? global
                  : "undefined" != typeof self
                  ? self
                  : "undefined" != typeof window
                  ? window
                  : {}
              ));
            },
            { "./adapter_factory.js": 4 }
          ],
          4: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("./utils");
              module.exports = function(dependencies, opts) {
                var window = dependencies && dependencies.window,
                  options = {
                    shimChrome: !0,
                    shimFirefox: !0,
                    shimEdge: !0,
                    shimSafari: !0
                  };
                for (var key in opts)
                  hasOwnProperty.call(opts, key) && (options[key] = opts[key]);
                var logging = utils.log,
                  browserDetails = utils.detectBrowser(window),
                  chromeShim = requirecopy("./chrome/chrome_shim") || null,
                  edgeShim = requirecopy("./edge/edge_shim") || null,
                  firefoxShim = requirecopy("./firefox/firefox_shim") || null,
                  safariShim = requirecopy("./safari/safari_shim") || null,
                  commonShim = requirecopy("./common_shim") || null,
                  adapter = {
                    browserDetails: browserDetails,
                    commonShim: commonShim,
                    extractVersion: utils.extractVersion,
                    disableLog: utils.disableLog,
                    disableWarnings: utils.disableWarnings
                  };
                switch (browserDetails.browser) {
                  case "chrome":
                    if (
                      !chromeShim ||
                      !chromeShim.shimPeerConnection ||
                      !options.shimChrome
                    )
                      return (
                        logging(
                          "Chrome shim is not included in this adapter release."
                        ),
                        adapter
                      );
                    logging("adapter.js shimming chrome."),
                      (adapter.browserShim = chromeShim),
                      commonShim.shimCreateObjectURL(window),
                      chromeShim.shimGetUserMedia(window),
                      chromeShim.shimMediaStream(window),
                      chromeShim.shimSourceObject(window),
                      chromeShim.shimPeerConnection(window),
                      chromeShim.shimOnTrack(window),
                      chromeShim.shimAddTrackRemoveTrack(window),
                      chromeShim.shimGetSendersWithDtmf(window),
                      chromeShim.shimSenderReceiverGetStats(window),
                      chromeShim.fixNegotiationNeeded(window),
                      commonShim.shimRTCIceCandidate(window),
                      commonShim.shimMaxMessageSize(window),
                      commonShim.shimSendThrowTypeError(window);
                    break;
                  case "firefox":
                    if (
                      !firefoxShim ||
                      !firefoxShim.shimPeerConnection ||
                      !options.shimFirefox
                    )
                      return (
                        logging(
                          "Firefox shim is not included in this adapter release."
                        ),
                        adapter
                      );
                    logging("adapter.js shimming firefox."),
                      (adapter.browserShim = firefoxShim),
                      commonShim.shimCreateObjectURL(window),
                      firefoxShim.shimGetUserMedia(window),
                      firefoxShim.shimSourceObject(window),
                      firefoxShim.shimPeerConnection(window),
                      firefoxShim.shimOnTrack(window),
                      firefoxShim.shimRemoveStream(window),
                      firefoxShim.shimSenderGetStats(window),
                      firefoxShim.shimReceiverGetStats(window),
                      firefoxShim.shimRTCDataChannel(window),
                      commonShim.shimRTCIceCandidate(window),
                      commonShim.shimMaxMessageSize(window),
                      commonShim.shimSendThrowTypeError(window);
                    break;
                  case "edge":
                    if (
                      !edgeShim ||
                      !edgeShim.shimPeerConnection ||
                      !options.shimEdge
                    )
                      return (
                        logging(
                          "MS edge shim is not included in this adapter release."
                        ),
                        adapter
                      );
                    logging("adapter.js shimming edge."),
                      (adapter.browserShim = edgeShim),
                      commonShim.shimCreateObjectURL(window),
                      edgeShim.shimGetUserMedia(window),
                      edgeShim.shimPeerConnection(window),
                      edgeShim.shimReplaceTrack(window),
                      commonShim.shimMaxMessageSize(window),
                      commonShim.shimSendThrowTypeError(window);
                    break;
                  case "safari":
                    if (!safariShim || !options.shimSafari)
                      return (
                        logging(
                          "Safari shim is not included in this adapter release."
                        ),
                        adapter
                      );
                    logging("adapter.js shimming safari."),
                      (adapter.browserShim = safariShim),
                      commonShim.shimCreateObjectURL(window),
                      safariShim.shimRTCIceServerUrls(window),
                      safariShim.shimCreateOfferLegacy(window),
                      safariShim.shimCallbacksAPI(window),
                      safariShim.shimLocalStreamsAPI(window),
                      safariShim.shimRemoteStreamsAPI(window),
                      safariShim.shimTrackEventTransceiver(window),
                      safariShim.shimGetUserMedia(window),
                      commonShim.shimRTCIceCandidate(window),
                      commonShim.shimMaxMessageSize(window),
                      commonShim.shimSendThrowTypeError(window);
                    break;
                  default:
                    logging("Unsupported browser!");
                }
                return adapter;
              };
            },
            {
              "./chrome/chrome_shim": 5,
              "./common_shim": 7,
              "./edge/edge_shim": 8,
              "./firefox/firefox_shim": 11,
              "./safari/safari_shim": 13,
              "./utils": 14
            }
          ],
          5: [
            function(requirecopy, module, exports) {
              function walkStats(stats, base, resultSet) {
                base &&
                  !resultSet.has(base.id) &&
                  (resultSet.set(base.id, base),
                  Object.keys(base).forEach(function(name) {
                    name.endsWith("Id")
                      ? walkStats(stats, stats.get(base[name]), resultSet)
                      : name.endsWith("Ids") &&
                        base[name].forEach(function(id) {
                          walkStats(stats, stats.get(id), resultSet);
                        });
                  }));
              }
              function filterStats(result, track, outbound) {
                var streamStatsType = outbound ? "outbound-rtp" : "inbound-rtp",
                  filteredResult = new Map();
                if (null === track) return filteredResult;
                var trackStats = [];
                return (
                  result.forEach(function(value) {
                    "track" === value.type &&
                      value.trackIdentifier === track.id &&
                      trackStats.push(value);
                  }),
                  trackStats.forEach(function(trackStat) {
                    result.forEach(function(stats) {
                      stats.type === streamStatsType &&
                        stats.trackId === trackStat.id &&
                        walkStats(result, stats, filteredResult);
                    });
                  }),
                  filteredResult
                );
              }
              var utils = requirecopy("../utils.js"),
                logging = utils.log;
              module.exports = {
                shimGetUserMedia: requirecopy("./getusermedia"),
                shimMediaStream: function(window) {
                  window.MediaStream =
                    window.MediaStream || window.webkitMediaStream;
                },
                shimOnTrack: function(window) {
                  if (
                    "object" != typeof window ||
                    !window.RTCPeerConnection ||
                    "ontrack" in window.RTCPeerConnection.prototype
                  )
                    "RTCRtpTransceiver" in window ||
                      utils.wrapPeerConnectionEvent(window, "track", function(
                        e
                      ) {
                        return (
                          e.transceiver ||
                            (e.transceiver = { receiver: e.receiver }),
                          e
                        );
                      });
                  else {
                    Object.defineProperty(
                      window.RTCPeerConnection.prototype,
                      "ontrack",
                      {
                        get: function() {
                          return this._ontrack;
                        },
                        set: function(f) {
                          this._ontrack &&
                            this.removeEventListener("track", this._ontrack),
                            this.addEventListener("track", (this._ontrack = f));
                        },
                        enumerable: !0,
                        configurable: !0
                      }
                    );
                    var origSetRemoteDescription =
                      window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
                      var pc = this;
                      return (
                        pc._ontrackpoly ||
                          ((pc._ontrackpoly = function(e) {
                            e.stream.addEventListener("addtrack", function(te) {
                              var receiver;
                              receiver = window.RTCPeerConnection.prototype
                                .getReceivers
                                ? pc.getReceivers().find(function(r) {
                                    return (
                                      r.track && r.track.id === te.track.id
                                    );
                                  })
                                : { track: te.track };
                              var event = new Event("track");
                              (event.track = te.track),
                                (event.receiver = receiver),
                                (event.transceiver = { receiver: receiver }),
                                (event.streams = [e.stream]),
                                pc.dispatchEvent(event);
                            }),
                              e.stream.getTracks().forEach(function(track) {
                                var receiver;
                                receiver = window.RTCPeerConnection.prototype
                                  .getReceivers
                                  ? pc.getReceivers().find(function(r) {
                                      return r.track && r.track.id === track.id;
                                    })
                                  : { track: track };
                                var event = new Event("track");
                                (event.track = track),
                                  (event.receiver = receiver),
                                  (event.transceiver = { receiver: receiver }),
                                  (event.streams = [e.stream]),
                                  pc.dispatchEvent(event);
                              });
                          }),
                          pc.addEventListener("addstream", pc._ontrackpoly)),
                        origSetRemoteDescription.apply(pc, arguments)
                      );
                    };
                  }
                },
                shimGetSendersWithDtmf: function(window) {
                  if (
                    "object" == typeof window &&
                    window.RTCPeerConnection &&
                    !("getSenders" in window.RTCPeerConnection.prototype) &&
                    "createDTMFSender" in window.RTCPeerConnection.prototype
                  ) {
                    var shimSenderWithDtmf = function(pc, track) {
                      return {
                        track: track,
                        get dtmf() {
                          return (
                            void 0 === this._dtmf &&
                              ("audio" === track.kind
                                ? (this._dtmf = pc.createDTMFSender(track))
                                : (this._dtmf = null)),
                            this._dtmf
                          );
                        },
                        _pc: pc
                      };
                    };
                    if (!window.RTCPeerConnection.prototype.getSenders) {
                      window.RTCPeerConnection.prototype.getSenders = function() {
                        return (
                          (this._senders = this._senders || []),
                          this._senders.slice()
                        );
                      };
                      var origAddTrack =
                        window.RTCPeerConnection.prototype.addTrack;
                      window.RTCPeerConnection.prototype.addTrack = function(
                        track,
                        stream
                      ) {
                        var pc = this,
                          sender = origAddTrack.apply(pc, arguments);
                        return (
                          sender ||
                            ((sender = shimSenderWithDtmf(pc, track)),
                            pc._senders.push(sender)),
                          sender
                        );
                      };
                      var origRemoveTrack =
                        window.RTCPeerConnection.prototype.removeTrack;
                      window.RTCPeerConnection.prototype.removeTrack = function(
                        sender
                      ) {
                        var pc = this;
                        origRemoveTrack.apply(pc, arguments);
                        var idx = pc._senders.indexOf(sender);
                        -1 !== idx && pc._senders.splice(idx, 1);
                      };
                    }
                    var origAddStream =
                      window.RTCPeerConnection.prototype.addStream;
                    window.RTCPeerConnection.prototype.addStream = function(
                      stream
                    ) {
                      var pc = this;
                      (pc._senders = pc._senders || []),
                        origAddStream.apply(pc, [stream]),
                        stream.getTracks().forEach(function(track) {
                          pc._senders.push(shimSenderWithDtmf(pc, track));
                        });
                    };
                    var origRemoveStream =
                      window.RTCPeerConnection.prototype.removeStream;
                    window.RTCPeerConnection.prototype.removeStream = function(
                      stream
                    ) {
                      var pc = this;
                      (pc._senders = pc._senders || []),
                        origRemoveStream.apply(pc, [stream]),
                        stream.getTracks().forEach(function(track) {
                          var sender = pc._senders.find(function(s) {
                            return s.track === track;
                          });
                          sender &&
                            pc._senders.splice(pc._senders.indexOf(sender), 1);
                        });
                    };
                  } else if (
                    "object" == typeof window &&
                    window.RTCPeerConnection &&
                    "getSenders" in window.RTCPeerConnection.prototype &&
                    "createDTMFSender" in window.RTCPeerConnection.prototype &&
                    window.RTCRtpSender &&
                    !("dtmf" in window.RTCRtpSender.prototype)
                  ) {
                    var origGetSenders =
                      window.RTCPeerConnection.prototype.getSenders;
                    (window.RTCPeerConnection.prototype.getSenders = function() {
                      var pc = this,
                        senders = origGetSenders.apply(pc, []);
                      return (
                        senders.forEach(function(sender) {
                          sender._pc = pc;
                        }),
                        senders
                      );
                    }),
                      Object.defineProperty(
                        window.RTCRtpSender.prototype,
                        "dtmf",
                        {
                          get: function() {
                            return (
                              void 0 === this._dtmf &&
                                ("audio" === this.track.kind
                                  ? (this._dtmf = this._pc.createDTMFSender(
                                      this.track
                                    ))
                                  : (this._dtmf = null)),
                              this._dtmf
                            );
                          }
                        }
                      );
                  }
                },
                shimSenderReceiverGetStats: function(window) {
                  if (
                    "object" == typeof window &&
                    window.RTCPeerConnection &&
                    window.RTCRtpSender &&
                    window.RTCRtpReceiver
                  ) {
                    if (!("getStats" in window.RTCRtpSender.prototype)) {
                      var origGetSenders =
                        window.RTCPeerConnection.prototype.getSenders;
                      origGetSenders &&
                        (window.RTCPeerConnection.prototype.getSenders = function() {
                          var pc = this,
                            senders = origGetSenders.apply(pc, []);
                          return (
                            senders.forEach(function(sender) {
                              sender._pc = pc;
                            }),
                            senders
                          );
                        });
                      var origAddTrack =
                        window.RTCPeerConnection.prototype.addTrack;
                      origAddTrack &&
                        (window.RTCPeerConnection.prototype.addTrack = function() {
                          var sender = origAddTrack.apply(this, arguments);
                          return (sender._pc = this), sender;
                        }),
                        (window.RTCRtpSender.prototype.getStats = function() {
                          var sender = this;
                          return this._pc.getStats().then(function(result) {
                            return filterStats(result, sender.track, !0);
                          });
                        });
                    }
                    if (!("getStats" in window.RTCRtpReceiver.prototype)) {
                      var origGetReceivers =
                        window.RTCPeerConnection.prototype.getReceivers;
                      origGetReceivers &&
                        (window.RTCPeerConnection.prototype.getReceivers = function() {
                          var pc = this,
                            receivers = origGetReceivers.apply(pc, []);
                          return (
                            receivers.forEach(function(receiver) {
                              receiver._pc = pc;
                            }),
                            receivers
                          );
                        }),
                        utils.wrapPeerConnectionEvent(window, "track", function(
                          e
                        ) {
                          return (e.receiver._pc = e.srcElement), e;
                        }),
                        (window.RTCRtpReceiver.prototype.getStats = function() {
                          var receiver = this;
                          return this._pc.getStats().then(function(result) {
                            return filterStats(result, receiver.track, !1);
                          });
                        });
                    }
                    if (
                      "getStats" in window.RTCRtpSender.prototype &&
                      "getStats" in window.RTCRtpReceiver.prototype
                    ) {
                      var origGetStats =
                        window.RTCPeerConnection.prototype.getStats;
                      window.RTCPeerConnection.prototype.getStats = function() {
                        var pc = this;
                        if (
                          arguments.length > 0 &&
                          arguments[0] instanceof window.MediaStreamTrack
                        ) {
                          var sender,
                            receiver,
                            err,
                            track = arguments[0];
                          return (
                            pc.getSenders().forEach(function(s) {
                              s.track === track &&
                                (sender ? (err = !0) : (sender = s));
                            }),
                            pc.getReceivers().forEach(function(r) {
                              return (
                                r.track === track &&
                                  (receiver ? (err = !0) : (receiver = r)),
                                r.track === track
                              );
                            }),
                            err || (sender && receiver)
                              ? Promise.reject(
                                  new DOMException(
                                    "There are more than one sender or receiver for the track.",
                                    "InvalidAccessError"
                                  )
                                )
                              : sender
                              ? sender.getStats()
                              : receiver
                              ? receiver.getStats()
                              : Promise.reject(
                                  new DOMException(
                                    "There is no sender or receiver for the track.",
                                    "InvalidAccessError"
                                  )
                                )
                          );
                        }
                        return origGetStats.apply(pc, arguments);
                      };
                    }
                  }
                },
                shimSourceObject: function(window) {
                  var URL = window && window.URL;
                  "object" == typeof window &&
                    (!window.HTMLMediaElement ||
                      "srcObject" in window.HTMLMediaElement.prototype ||
                      Object.defineProperty(
                        window.HTMLMediaElement.prototype,
                        "srcObject",
                        {
                          get: function() {
                            return this._srcObject;
                          },
                          set: function(stream) {
                            var self = this;
                            if (
                              ((this._srcObject = stream),
                              this.src && URL.revokeObjectURL(this.src),
                              !stream)
                            )
                              return void (this.src = "");
                            (this.src = URL.createObjectURL(stream)),
                              stream.addEventListener("addtrack", function() {
                                self.src && URL.revokeObjectURL(self.src),
                                  (self.src = URL.createObjectURL(stream));
                              }),
                              stream.addEventListener(
                                "removetrack",
                                function() {
                                  self.src && URL.revokeObjectURL(self.src),
                                    (self.src = URL.createObjectURL(stream));
                                }
                              );
                          }
                        }
                      ));
                },
                shimAddTrackRemoveTrackWithNative: function(window) {
                  window.RTCPeerConnection.prototype.getLocalStreams = function() {
                    var pc = this;
                    return (
                      (this._shimmedLocalStreams =
                        this._shimmedLocalStreams || {}),
                      Object.keys(this._shimmedLocalStreams).map(function(
                        streamId
                      ) {
                        return pc._shimmedLocalStreams[streamId][0];
                      })
                    );
                  };
                  var origAddTrack =
                    window.RTCPeerConnection.prototype.addTrack;
                  window.RTCPeerConnection.prototype.addTrack = function(
                    track,
                    stream
                  ) {
                    if (!stream) return origAddTrack.apply(this, arguments);
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    var sender = origAddTrack.apply(this, arguments);
                    return (
                      this._shimmedLocalStreams[stream.id]
                        ? -1 ===
                            this._shimmedLocalStreams[stream.id].indexOf(
                              sender
                            ) &&
                          this._shimmedLocalStreams[stream.id].push(sender)
                        : (this._shimmedLocalStreams[stream.id] = [
                            stream,
                            sender
                          ]),
                      sender
                    );
                  };
                  var origAddStream =
                    window.RTCPeerConnection.prototype.addStream;
                  window.RTCPeerConnection.prototype.addStream = function(
                    stream
                  ) {
                    var pc = this;
                    (this._shimmedLocalStreams =
                      this._shimmedLocalStreams || {}),
                      stream.getTracks().forEach(function(track) {
                        if (
                          pc.getSenders().find(function(s) {
                            return s.track === track;
                          })
                        )
                          throw new DOMException(
                            "Track already exists.",
                            "InvalidAccessError"
                          );
                      });
                    var existingSenders = pc.getSenders();
                    origAddStream.apply(this, arguments);
                    var newSenders = pc
                      .getSenders()
                      .filter(function(newSender) {
                        return -1 === existingSenders.indexOf(newSender);
                      });
                    this._shimmedLocalStreams[stream.id] = [stream].concat(
                      newSenders
                    );
                  };
                  var origRemoveStream =
                    window.RTCPeerConnection.prototype.removeStream;
                  window.RTCPeerConnection.prototype.removeStream = function(
                    stream
                  ) {
                    return (
                      (this._shimmedLocalStreams =
                        this._shimmedLocalStreams || {}),
                      delete this._shimmedLocalStreams[stream.id],
                      origRemoveStream.apply(this, arguments)
                    );
                  };
                  var origRemoveTrack =
                    window.RTCPeerConnection.prototype.removeTrack;
                  window.RTCPeerConnection.prototype.removeTrack = function(
                    sender
                  ) {
                    var pc = this;
                    return (
                      (this._shimmedLocalStreams =
                        this._shimmedLocalStreams || {}),
                      sender &&
                        Object.keys(this._shimmedLocalStreams).forEach(function(
                          streamId
                        ) {
                          var idx = pc._shimmedLocalStreams[streamId].indexOf(
                            sender
                          );
                          -1 !== idx &&
                            pc._shimmedLocalStreams[streamId].splice(idx, 1),
                            1 === pc._shimmedLocalStreams[streamId].length &&
                              delete pc._shimmedLocalStreams[streamId];
                        }),
                      origRemoveTrack.apply(this, arguments)
                    );
                  };
                },
                shimAddTrackRemoveTrack: function(window) {
                  function replaceInternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    return (
                      Object.keys(pc._reverseStreams || []).forEach(function(
                        internalId
                      ) {
                        var externalStream = pc._reverseStreams[internalId],
                          internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(
                          new RegExp(internalStream.id, "g"),
                          externalStream.id
                        );
                      }),
                      new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                      })
                    );
                  }
                  function replaceExternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    return (
                      Object.keys(pc._reverseStreams || []).forEach(function(
                        internalId
                      ) {
                        var externalStream = pc._reverseStreams[internalId],
                          internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(
                          new RegExp(externalStream.id, "g"),
                          internalStream.id
                        );
                      }),
                      new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                      })
                    );
                  }
                  var browserDetails = utils.detectBrowser(window);
                  if (
                    window.RTCPeerConnection.prototype.addTrack &&
                    browserDetails.version >= 65
                  )
                    return this.shimAddTrackRemoveTrackWithNative(window);
                  var origGetLocalStreams =
                    window.RTCPeerConnection.prototype.getLocalStreams;
                  window.RTCPeerConnection.prototype.getLocalStreams = function() {
                    var pc = this,
                      nativeStreams = origGetLocalStreams.apply(this);
                    return (
                      (pc._reverseStreams = pc._reverseStreams || {}),
                      nativeStreams.map(function(stream) {
                        return pc._reverseStreams[stream.id];
                      })
                    );
                  };
                  var origAddStream =
                    window.RTCPeerConnection.prototype.addStream;
                  window.RTCPeerConnection.prototype.addStream = function(
                    stream
                  ) {
                    var pc = this;
                    if (
                      ((pc._streams = pc._streams || {}),
                      (pc._reverseStreams = pc._reverseStreams || {}),
                      stream.getTracks().forEach(function(track) {
                        if (
                          pc.getSenders().find(function(s) {
                            return s.track === track;
                          })
                        )
                          throw new DOMException(
                            "Track already exists.",
                            "InvalidAccessError"
                          );
                      }),
                      !pc._reverseStreams[stream.id])
                    ) {
                      var newStream = new window.MediaStream(
                        stream.getTracks()
                      );
                      (pc._streams[stream.id] = newStream),
                        (pc._reverseStreams[newStream.id] = stream),
                        (stream = newStream);
                    }
                    origAddStream.apply(pc, [stream]);
                  };
                  var origRemoveStream =
                    window.RTCPeerConnection.prototype.removeStream;
                  (window.RTCPeerConnection.prototype.removeStream = function(
                    stream
                  ) {
                    var pc = this;
                    (pc._streams = pc._streams || {}),
                      (pc._reverseStreams = pc._reverseStreams || {}),
                      origRemoveStream.apply(pc, [
                        pc._streams[stream.id] || stream
                      ]),
                      delete pc._reverseStreams[
                        pc._streams[stream.id]
                          ? pc._streams[stream.id].id
                          : stream.id
                      ],
                      delete pc._streams[stream.id];
                  }),
                    (window.RTCPeerConnection.prototype.addTrack = function(
                      track,
                      stream
                    ) {
                      var pc = this;
                      if ("closed" === pc.signalingState)
                        throw new DOMException(
                          "The RTCPeerConnection's signalingState is 'closed'.",
                          "InvalidStateError"
                        );
                      var streams = [].slice.call(arguments, 1);
                      if (
                        1 !== streams.length ||
                        !streams[0].getTracks().find(function(t) {
                          return t === track;
                        })
                      )
                        throw new DOMException(
                          "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
                          "NotSupportedError"
                        );
                      if (
                        pc.getSenders().find(function(s) {
                          return s.track === track;
                        })
                      )
                        throw new DOMException(
                          "Track already exists.",
                          "InvalidAccessError"
                        );
                      (pc._streams = pc._streams || {}),
                        (pc._reverseStreams = pc._reverseStreams || {});
                      var oldStream = pc._streams[stream.id];
                      if (oldStream)
                        oldStream.addTrack(track),
                          Promise.resolve().then(function() {
                            pc.dispatchEvent(new Event("negotiationneeded"));
                          });
                      else {
                        var newStream = new window.MediaStream([track]);
                        (pc._streams[stream.id] = newStream),
                          (pc._reverseStreams[newStream.id] = stream),
                          pc.addStream(newStream);
                      }
                      return pc.getSenders().find(function(s) {
                        return s.track === track;
                      });
                    }),
                    ["createOffer", "createAnswer"].forEach(function(method) {
                      var nativeMethod =
                        window.RTCPeerConnection.prototype[method];
                      window.RTCPeerConnection.prototype[method] = function() {
                        var pc = this,
                          args = arguments;
                        return arguments.length &&
                          "function" == typeof arguments[0]
                          ? nativeMethod.apply(pc, [
                              function(description) {
                                var desc = replaceInternalStreamId(
                                  pc,
                                  description
                                );
                                args[0].apply(null, [desc]);
                              },
                              function(err) {
                                args[1] && args[1].apply(null, err);
                              },
                              arguments[2]
                            ])
                          : nativeMethod
                              .apply(pc, arguments)
                              .then(function(description) {
                                return replaceInternalStreamId(pc, description);
                              });
                      };
                    });
                  var origSetLocalDescription =
                    window.RTCPeerConnection.prototype.setLocalDescription;
                  window.RTCPeerConnection.prototype.setLocalDescription = function() {
                    var pc = this;
                    return arguments.length && arguments[0].type
                      ? ((arguments[0] = replaceExternalStreamId(
                          pc,
                          arguments[0]
                        )),
                        origSetLocalDescription.apply(pc, arguments))
                      : origSetLocalDescription.apply(pc, arguments);
                  };
                  var origLocalDescription = Object.getOwnPropertyDescriptor(
                    window.RTCPeerConnection.prototype,
                    "localDescription"
                  );
                  Object.defineProperty(
                    window.RTCPeerConnection.prototype,
                    "localDescription",
                    {
                      get: function() {
                        var pc = this,
                          description = origLocalDescription.get.apply(this);
                        return "" === description.type
                          ? description
                          : replaceInternalStreamId(pc, description);
                      }
                    }
                  ),
                    (window.RTCPeerConnection.prototype.removeTrack = function(
                      sender
                    ) {
                      var pc = this;
                      if ("closed" === pc.signalingState)
                        throw new DOMException(
                          "The RTCPeerConnection's signalingState is 'closed'.",
                          "InvalidStateError"
                        );
                      if (!sender._pc)
                        throw new DOMException(
                          "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
                          "TypeError"
                        );
                      if (sender._pc !== pc)
                        throw new DOMException(
                          "Sender was not created by this connection.",
                          "InvalidAccessError"
                        );
                      pc._streams = pc._streams || {};
                      var stream;
                      Object.keys(pc._streams).forEach(function(streamid) {
                        pc._streams[streamid].getTracks().find(function(track) {
                          return sender.track === track;
                        }) && (stream = pc._streams[streamid]);
                      }),
                        stream &&
                          (1 === stream.getTracks().length
                            ? pc.removeStream(pc._reverseStreams[stream.id])
                            : stream.removeTrack(sender.track),
                          pc.dispatchEvent(new Event("negotiationneeded")));
                    });
                },
                shimPeerConnection: function(window) {
                  var browserDetails = utils.detectBrowser(window);
                  if (
                    !window.RTCPeerConnection &&
                    window.webkitRTCPeerConnection
                  )
                    (window.RTCPeerConnection = function(
                      pcConfig,
                      pcConstraints
                    ) {
                      return (
                        logging("PeerConnection"),
                        pcConfig &&
                          pcConfig.iceTransportPolicy &&
                          (pcConfig.iceTransports =
                            pcConfig.iceTransportPolicy),
                        new window.webkitRTCPeerConnection(
                          pcConfig,
                          pcConstraints
                        )
                      );
                    }),
                      (window.RTCPeerConnection.prototype =
                        window.webkitRTCPeerConnection.prototype),
                      window.webkitRTCPeerConnection.generateCertificate &&
                        Object.defineProperty(
                          window.RTCPeerConnection,
                          "generateCertificate",
                          {
                            get: function() {
                              return window.webkitRTCPeerConnection
                                .generateCertificate;
                            }
                          }
                        );
                  else {
                    var OrigPeerConnection = window.RTCPeerConnection;
                    (window.RTCPeerConnection = function(
                      pcConfig,
                      pcConstraints
                    ) {
                      if (pcConfig && pcConfig.iceServers) {
                        for (
                          var newIceServers = [], i = 0;
                          i < pcConfig.iceServers.length;
                          i++
                        ) {
                          var server = pcConfig.iceServers[i];
                          !server.hasOwnProperty("urls") &&
                          server.hasOwnProperty("url")
                            ? (utils.deprecated(
                                "RTCIceServer.url",
                                "RTCIceServer.urls"
                              ),
                              (server = JSON.parse(JSON.stringify(server))),
                              (server.urls = server.url),
                              newIceServers.push(server))
                            : newIceServers.push(pcConfig.iceServers[i]);
                        }
                        pcConfig.iceServers = newIceServers;
                      }
                      return new OrigPeerConnection(pcConfig, pcConstraints);
                    }),
                      (window.RTCPeerConnection.prototype =
                        OrigPeerConnection.prototype),
                      Object.defineProperty(
                        window.RTCPeerConnection,
                        "generateCertificate",
                        {
                          get: function() {
                            return OrigPeerConnection.generateCertificate;
                          }
                        }
                      );
                  }
                  var origGetStats =
                    window.RTCPeerConnection.prototype.getStats;
                  (window.RTCPeerConnection.prototype.getStats = function(
                    selector,
                    successCallback,
                    errorCallback
                  ) {
                    var pc = this,
                      args = arguments;
                    if (arguments.length > 0 && "function" == typeof selector)
                      return origGetStats.apply(this, arguments);
                    if (
                      0 === origGetStats.length &&
                      (0 === arguments.length ||
                        "function" != typeof arguments[0])
                    )
                      return origGetStats.apply(this, []);
                    var fixChromeStats_ = function(response) {
                        var standardReport = {};
                        return (
                          response.result().forEach(function(report) {
                            var standardStats = {
                              id: report.id,
                              timestamp: report.timestamp,
                              type:
                                {
                                  localcandidate: "local-candidate",
                                  remotecandidate: "remote-candidate"
                                }[report.type] || report.type
                            };
                            report.names().forEach(function(name) {
                              standardStats[name] = report.stat(name);
                            }),
                              (standardReport[
                                standardStats.id
                              ] = standardStats);
                          }),
                          standardReport
                        );
                      },
                      makeMapStats = function(stats) {
                        return new Map(
                          Object.keys(stats).map(function(key) {
                            return [key, stats[key]];
                          })
                        );
                      };
                    if (arguments.length >= 2) {
                      var successCallbackWrapper_ = function(response) {
                        args[1](makeMapStats(fixChromeStats_(response)));
                      };
                      return origGetStats.apply(this, [
                        successCallbackWrapper_,
                        arguments[0]
                      ]);
                    }
                    return new Promise(function(resolve, reject) {
                      origGetStats.apply(pc, [
                        function(response) {
                          resolve(makeMapStats(fixChromeStats_(response)));
                        },
                        reject
                      ]);
                    }).then(successCallback, errorCallback);
                  }),
                    browserDetails.version < 51 &&
                      [
                        "setLocalDescription",
                        "setRemoteDescription",
                        "addIceCandidate"
                      ].forEach(function(method) {
                        var nativeMethod =
                          window.RTCPeerConnection.prototype[method];
                        window.RTCPeerConnection.prototype[
                          method
                        ] = function() {
                          var args = arguments,
                            pc = this,
                            promise = new Promise(function(resolve, reject) {
                              nativeMethod.apply(pc, [
                                args[0],
                                resolve,
                                reject
                              ]);
                            });
                          return args.length < 2
                            ? promise
                            : promise.then(
                                function() {
                                  args[1].apply(null, []);
                                },
                                function(err) {
                                  args.length >= 3 &&
                                    args[2].apply(null, [err]);
                                }
                              );
                        };
                      }),
                    browserDetails.version < 52 &&
                      ["createOffer", "createAnswer"].forEach(function(method) {
                        var nativeMethod =
                          window.RTCPeerConnection.prototype[method];
                        window.RTCPeerConnection.prototype[
                          method
                        ] = function() {
                          var pc = this;
                          if (
                            arguments.length < 1 ||
                            (1 === arguments.length &&
                              "object" == typeof arguments[0])
                          ) {
                            var opts =
                              1 === arguments.length ? arguments[0] : void 0;
                            return new Promise(function(resolve, reject) {
                              nativeMethod.apply(pc, [resolve, reject, opts]);
                            });
                          }
                          return nativeMethod.apply(this, arguments);
                        };
                      }),
                    [
                      "setLocalDescription",
                      "setRemoteDescription",
                      "addIceCandidate"
                    ].forEach(function(method) {
                      var nativeMethod =
                        window.RTCPeerConnection.prototype[method];
                      window.RTCPeerConnection.prototype[method] = function() {
                        return (
                          (arguments[0] = new ("addIceCandidate" === method
                            ? window.RTCIceCandidate
                            : window.RTCSessionDescription)(arguments[0])),
                          nativeMethod.apply(this, arguments)
                        );
                      };
                    });
                  var nativeAddIceCandidate =
                    window.RTCPeerConnection.prototype.addIceCandidate;
                  window.RTCPeerConnection.prototype.addIceCandidate = function() {
                    return arguments[0]
                      ? nativeAddIceCandidate.apply(this, arguments)
                      : (arguments[1] && arguments[1].apply(null),
                        Promise.resolve());
                  };
                },
                fixNegotiationNeeded: function(window) {
                  utils.wrapPeerConnectionEvent(
                    window,
                    "negotiationneeded",
                    function(e) {
                      if ("stable" === e.target.signalingState) return e;
                    }
                  );
                },
                shimGetDisplayMedia: function(window, getSourceId) {
                  "getDisplayMedia" in window.navigator ||
                    ("function" == typeof getSourceId &&
                      (navigator.getDisplayMedia = function(constraints) {
                        return getSourceId(constraints).then(function(
                          sourceId
                        ) {
                          return (
                            (constraints.video = {
                              mandatory: {
                                chromeMediaSource: "desktop",
                                chromeMediaSourceId: sourceId,
                                maxFrameRate: constraints.video.frameRate || 3
                              }
                            }),
                            navigator.mediaDevices.getUserMedia(constraints)
                          );
                        });
                      }));
                }
              };
            },
            { "../utils.js": 14, "./getusermedia": 6 }
          ],
          6: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("../utils.js"),
                logging = utils.log;
              module.exports = function(window) {
                var browserDetails = utils.detectBrowser(window),
                  navigator = window && window.navigator,
                  constraintsToChrome_ = function(c) {
                    if ("object" != typeof c || c.mandatory || c.optional)
                      return c;
                    var cc = {};
                    return (
                      Object.keys(c).forEach(function(key) {
                        if (
                          "require" !== key &&
                          "advanced" !== key &&
                          "mediaSource" !== key
                        ) {
                          var r =
                            "object" == typeof c[key]
                              ? c[key]
                              : { ideal: c[key] };
                          void 0 !== r.exact &&
                            "number" == typeof r.exact &&
                            (r.min = r.max = r.exact);
                          var oldname_ = function(prefix, name) {
                            return prefix
                              ? prefix +
                                  name.charAt(0).toUpperCase() +
                                  name.slice(1)
                              : "deviceId" === name
                              ? "sourceId"
                              : name;
                          };
                          if (void 0 !== r.ideal) {
                            cc.optional = cc.optional || [];
                            var oc = {};
                            "number" == typeof r.ideal
                              ? ((oc[oldname_("min", key)] = r.ideal),
                                cc.optional.push(oc),
                                (oc = {}),
                                (oc[oldname_("max", key)] = r.ideal),
                                cc.optional.push(oc))
                              : ((oc[oldname_("", key)] = r.ideal),
                                cc.optional.push(oc));
                          }
                          void 0 !== r.exact && "number" != typeof r.exact
                            ? ((cc.mandatory = cc.mandatory || {}),
                              (cc.mandatory[oldname_("", key)] = r.exact))
                            : ["min", "max"].forEach(function(mix) {
                                void 0 !== r[mix] &&
                                  ((cc.mandatory = cc.mandatory || {}),
                                  (cc.mandatory[oldname_(mix, key)] = r[mix]));
                              });
                        }
                      }),
                      c.advanced &&
                        (cc.optional = (cc.optional || []).concat(c.advanced)),
                      cc
                    );
                  },
                  shimConstraints_ = function(constraints, func) {
                    if (browserDetails.version >= 61) return func(constraints);
                    if (
                      (constraints = JSON.parse(JSON.stringify(constraints))) &&
                      "object" == typeof constraints.audio
                    ) {
                      var remap = function(obj, a, b) {
                        a in obj &&
                          !(b in obj) &&
                          ((obj[b] = obj[a]), delete obj[a]);
                      };
                      (constraints = JSON.parse(JSON.stringify(constraints))),
                        remap(
                          constraints.audio,
                          "autoGainControl",
                          "googAutoGainControl"
                        ),
                        remap(
                          constraints.audio,
                          "noiseSuppression",
                          "googNoiseSuppression"
                        ),
                        (constraints.audio = constraintsToChrome_(
                          constraints.audio
                        ));
                    }
                    if (constraints && "object" == typeof constraints.video) {
                      var face = constraints.video.facingMode;
                      face =
                        face &&
                        ("object" == typeof face ? face : { ideal: face });
                      var getSupportedFacingModeLies =
                        browserDetails.version < 66;
                      if (
                        face &&
                        ("user" === face.exact ||
                          "environment" === face.exact ||
                          "user" === face.ideal ||
                          "environment" === face.ideal) &&
                        (!navigator.mediaDevices.getSupportedConstraints ||
                          !navigator.mediaDevices.getSupportedConstraints()
                            .facingMode ||
                          getSupportedFacingModeLies)
                      ) {
                        delete constraints.video.facingMode;
                        var matches;
                        if (
                          ("environment" === face.exact ||
                          "environment" === face.ideal
                            ? (matches = ["back", "rear"])
                            : ("user" !== face.exact &&
                                "user" !== face.ideal) ||
                              (matches = ["front"]),
                          matches)
                        )
                          return navigator.mediaDevices
                            .enumerateDevices()
                            .then(function(devices) {
                              devices = devices.filter(function(d) {
                                return "videoinput" === d.kind;
                              });
                              var dev = devices.find(function(d) {
                                return matches.some(function(match) {
                                  return (
                                    -1 !== d.label.toLowerCase().indexOf(match)
                                  );
                                });
                              });
                              return (
                                !dev &&
                                  devices.length &&
                                  -1 !== matches.indexOf("back") &&
                                  (dev = devices[devices.length - 1]),
                                dev &&
                                  (constraints.video.deviceId = face.exact
                                    ? { exact: dev.deviceId }
                                    : { ideal: dev.deviceId }),
                                (constraints.video = constraintsToChrome_(
                                  constraints.video
                                )),
                                logging(
                                  "chrome: " + JSON.stringify(constraints)
                                ),
                                func(constraints)
                              );
                            });
                      }
                      constraints.video = constraintsToChrome_(
                        constraints.video
                      );
                    }
                    return (
                      logging("chrome: " + JSON.stringify(constraints)),
                      func(constraints)
                    );
                  },
                  shimError_ = function(e) {
                    return browserDetails.version >= 64
                      ? e
                      : {
                          name:
                            {
                              PermissionDeniedError: "NotAllowedError",
                              PermissionDismissedError: "NotAllowedError",
                              InvalidStateError: "NotAllowedError",
                              DevicesNotFoundError: "NotFoundError",
                              ConstraintNotSatisfiedError:
                                "OverconstrainedError",
                              TrackStartError: "NotReadableError",
                              MediaDeviceFailedDueToShutdown: "NotAllowedError",
                              MediaDeviceKillSwitchOn: "NotAllowedError",
                              TabCaptureError: "AbortError",
                              ScreenCaptureError: "AbortError",
                              DeviceCaptureError: "AbortError"
                            }[e.name] || e.name,
                          message: e.message,
                          constraint: e.constraint || e.constraintName,
                          toString: function() {
                            return (
                              this.name + (this.message && ": ") + this.message
                            );
                          }
                        };
                  },
                  getUserMedia_ = function(constraints, onSuccess, onError) {
                    shimConstraints_(constraints, function(c) {
                      navigator.webkitGetUserMedia(c, onSuccess, function(e) {
                        onError && onError(shimError_(e));
                      });
                    });
                  };
                navigator.getUserMedia = getUserMedia_;
                var getUserMediaPromise_ = function(constraints) {
                  return new Promise(function(resolve, reject) {
                    navigator.getUserMedia(constraints, resolve, reject);
                  });
                };
                if (
                  (navigator.mediaDevices ||
                    (navigator.mediaDevices = {
                      getUserMedia: getUserMediaPromise_,
                      enumerateDevices: function() {
                        return new Promise(function(resolve) {
                          var kinds = {
                            audio: "audioinput",
                            video: "videoinput"
                          };
                          return window.MediaStreamTrack.getSources(function(
                            devices
                          ) {
                            resolve(
                              devices.map(function(device) {
                                return {
                                  label: device.label,
                                  kind: kinds[device.kind],
                                  deviceId: device.id,
                                  groupId: ""
                                };
                              })
                            );
                          });
                        });
                      },
                      getSupportedConstraints: function() {
                        return {
                          deviceId: !0,
                          echoCancellation: !0,
                          facingMode: !0,
                          frameRate: !0,
                          height: !0,
                          width: !0
                        };
                      }
                    }),
                  navigator.mediaDevices.getUserMedia)
                ) {
                  var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
                    navigator.mediaDevices
                  );
                  navigator.mediaDevices.getUserMedia = function(cs) {
                    return shimConstraints_(cs, function(c) {
                      return origGetUserMedia(c).then(
                        function(stream) {
                          if (
                            (c.audio && !stream.getAudioTracks().length) ||
                            (c.video && !stream.getVideoTracks().length)
                          )
                            throw (stream.getTracks().forEach(function(track) {
                              track.stop();
                            }),
                            new DOMException("", "NotFoundError"));
                          return stream;
                        },
                        function(e) {
                          return Promise.reject(shimError_(e));
                        }
                      );
                    });
                  };
                } else
                  navigator.mediaDevices.getUserMedia = function(constraints) {
                    return getUserMediaPromise_(constraints);
                  };
                void 0 === navigator.mediaDevices.addEventListener &&
                  (navigator.mediaDevices.addEventListener = function() {
                    logging("Dummy mediaDevices.addEventListener called.");
                  }),
                  void 0 === navigator.mediaDevices.removeEventListener &&
                    (navigator.mediaDevices.removeEventListener = function() {
                      logging("Dummy mediaDevices.removeEventListener called.");
                    });
              };
            },
            { "../utils.js": 14 }
          ],
          7: [
            function(requirecopy, module, exports) {
              var SDPUtils = requirecopy("sdp"),
                utils = requirecopy("./utils");
              module.exports = {
                shimRTCIceCandidate: function(window) {
                  if (
                    window.RTCIceCandidate &&
                    !(
                      window.RTCIceCandidate &&
                      "foundation" in window.RTCIceCandidate.prototype
                    )
                  ) {
                    var NativeRTCIceCandidate = window.RTCIceCandidate;
                    (window.RTCIceCandidate = function(args) {
                      if (
                        ("object" == typeof args &&
                          args.candidate &&
                          0 === args.candidate.indexOf("a=") &&
                          ((args = JSON.parse(JSON.stringify(args))),
                          (args.candidate = args.candidate.substr(2))),
                        args.candidate && args.candidate.length)
                      ) {
                        var nativeCandidate = new NativeRTCIceCandidate(args),
                          parsedCandidate = SDPUtils.parseCandidate(
                            args.candidate
                          ),
                          augmentedCandidate = Object.assign(
                            nativeCandidate,
                            parsedCandidate
                          );
                        return (
                          (augmentedCandidate.toJSON = function() {
                            return {
                              candidate: augmentedCandidate.candidate,
                              sdpMid: augmentedCandidate.sdpMid,
                              sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                              usernameFragment:
                                augmentedCandidate.usernameFragment
                            };
                          }),
                          augmentedCandidate
                        );
                      }
                      return new NativeRTCIceCandidate(args);
                    }),
                      (window.RTCIceCandidate.prototype =
                        NativeRTCIceCandidate.prototype),
                      utils.wrapPeerConnectionEvent(
                        window,
                        "icecandidate",
                        function(e) {
                          return (
                            e.candidate &&
                              Object.defineProperty(e, "candidate", {
                                value: new window.RTCIceCandidate(e.candidate),
                                writable: "false"
                              }),
                            e
                          );
                        }
                      );
                  }
                },
                shimCreateObjectURL: function(window) {
                  var URL = window && window.URL;
                  if (
                    "object" == typeof window &&
                    window.HTMLMediaElement &&
                    "srcObject" in window.HTMLMediaElement.prototype &&
                    URL.createObjectURL &&
                    URL.revokeObjectURL
                  ) {
                    var nativeCreateObjectURL = URL.createObjectURL.bind(URL),
                      nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL),
                      streams = new Map(),
                      newId = 0;
                    (URL.createObjectURL = function(stream) {
                      if ("getTracks" in stream) {
                        var url = "polyblob:" + ++newId;
                        return (
                          streams.set(url, stream),
                          utils.deprecated(
                            "URL.createObjectURL(stream)",
                            "elem.srcObject = stream"
                          ),
                          url
                        );
                      }
                      return nativeCreateObjectURL(stream);
                    }),
                      (URL.revokeObjectURL = function(url) {
                        nativeRevokeObjectURL(url), streams.delete(url);
                      });
                    var dsc = Object.getOwnPropertyDescriptor(
                      window.HTMLMediaElement.prototype,
                      "src"
                    );
                    Object.defineProperty(
                      window.HTMLMediaElement.prototype,
                      "src",
                      {
                        get: function() {
                          return dsc.get.apply(this);
                        },
                        set: function(url) {
                          return (
                            (this.srcObject = streams.get(url) || null),
                            dsc.set.apply(this, [url])
                          );
                        }
                      }
                    );
                    var nativeSetAttribute =
                      window.HTMLMediaElement.prototype.setAttribute;
                    window.HTMLMediaElement.prototype.setAttribute = function() {
                      return (
                        2 === arguments.length &&
                          "src" === ("" + arguments[0]).toLowerCase() &&
                          (this.srcObject = streams.get(arguments[1]) || null),
                        nativeSetAttribute.apply(this, arguments)
                      );
                    };
                  }
                },
                shimMaxMessageSize: function(window) {
                  if (!window.RTCSctpTransport && window.RTCPeerConnection) {
                    var browserDetails = utils.detectBrowser(window);
                    "sctp" in window.RTCPeerConnection.prototype ||
                      Object.defineProperty(
                        window.RTCPeerConnection.prototype,
                        "sctp",
                        {
                          get: function() {
                            return void 0 === this._sctp ? null : this._sctp;
                          }
                        }
                      );
                    var sctpInDescription = function(description) {
                        var sections = SDPUtils.splitSections(description.sdp);
                        return (
                          sections.shift(),
                          sections.some(function(mediaSection) {
                            var mLine = SDPUtils.parseMLine(mediaSection);
                            return (
                              mLine &&
                              "application" === mLine.kind &&
                              -1 !== mLine.protocol.indexOf("SCTP")
                            );
                          })
                        );
                      },
                      getRemoteFirefoxVersion = function(description) {
                        var match = description.sdp.match(
                          /mozilla...THIS_IS_SDPARTA-(\d+)/
                        );
                        if (null === match || match.length < 2) return -1;
                        var version = parseInt(match[1], 10);
                        return version !== version ? -1 : version;
                      },
                      getCanSendMaxMessageSize = function(remoteIsFirefox) {
                        var canSendMaxMessageSize = 65536*1024;
                        return (
                          "firefox" === browserDetails.browser &&
                            (canSendMaxMessageSize =
                              browserDetails.version < 57
                                ? -1 === remoteIsFirefox
                                  ? 16384
                                  : 2147483637
                                : browserDetails.version < 60
                                ? 57 === browserDetails.version
                                  ? 65535*1024
                                  : 65536*1024
                                : 2147483637),
                          canSendMaxMessageSize
                        );
                      },
                      getMaxMessageSize = function(
                        description,
                        remoteIsFirefox
                      ) {
                        var maxMessageSize = 65536*1024;
                        "firefox" === browserDetails.browser &&
                          57 === browserDetails.version &&
                          (maxMessageSize = 65535*1024);
                        var match = SDPUtils.matchPrefix(
                          description.sdp,
                          "a=max-message-size:"
                        );
                        return (
                          match.length > 0
                            ? (maxMessageSize = parseInt(
                                match[0].substr(19),
                                10
                              ))
                            : "firefox" === browserDetails.browser &&
                              -1 !== remoteIsFirefox &&
                              (maxMessageSize = 2147483637),
                          maxMessageSize
                        );
                      },
                      origSetRemoteDescription =
                        window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
                      var pc = this;
                      if (
                        ((pc._sctp = null), sctpInDescription(arguments[0]))
                      ) {
                        var maxMessageSize,
                          isFirefox = getRemoteFirefoxVersion(arguments[0]),
                          canSendMMS = getCanSendMaxMessageSize(isFirefox),
                          remoteMMS = getMaxMessageSize(
                            arguments[0],
                            isFirefox
                          );
                        maxMessageSize =
                          0 === canSendMMS && 0 === remoteMMS
                            ? Number.POSITIVE_INFINITY
                            : 0 === canSendMMS || 0 === remoteMMS
                            ? Math.max(canSendMMS, remoteMMS)
                            : Math.min(canSendMMS, remoteMMS);
                        var sctp = {};
                        Object.defineProperty(sctp, "maxMessageSize", {
                          get: function() {
                            return maxMessageSize;
                          }
                        }),
                          (pc._sctp = sctp);
                      }
                      return origSetRemoteDescription.apply(pc, arguments);
                    };
                  }
                },
                shimSendThrowTypeError: function(window) {
                  function wrapDcSend(dc, pc) {
                    var origDataChannelSend = dc.send;
                    dc.send = function() {
                      var data = arguments[0],
                        length = data.length || data.size || data.byteLength;
                      if (
                        "open" === dc.readyState &&
                        pc.sctp //&&
                        //去掉了大小的校验
                        //length > pc.sctp.maxMessageSize
                      )
                        throw new TypeError(
                          "Message too large (can send a maximum of " +
                            pc.sctp.maxMessageSize +
                            " bytes)"
                        );
                      return origDataChannelSend.apply(dc, arguments);
                    };
                  }
                  if (
                    window.RTCPeerConnection &&
                    "createDataChannel" in window.RTCPeerConnection.prototype
                  ) {
                    var origCreateDataChannel =
                      window.RTCPeerConnection.prototype.createDataChannel;
                    (window.RTCPeerConnection.prototype.createDataChannel = function() {
                      var pc = this,
                        dataChannel = origCreateDataChannel.apply(
                          pc,
                          arguments
                        );
                      return wrapDcSend(dataChannel, pc), dataChannel;
                    }),
                      utils.wrapPeerConnectionEvent(
                        window,
                        "datachannel",
                        function(e) {
                          return wrapDcSend(e.channel, e.target), e;
                        }
                      );
                  }
                }
              };
            },
            { "./utils": 14, sdp: 2 }
          ],
          8: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("../utils"),
                filterIceServers = requirecopy("./filtericeservers"),
                shimRTCPeerConnection = requirecopy("rtcpeerconnection-shim");
              module.exports = {
                shimGetUserMedia: requirecopy("./getusermedia"),
                shimPeerConnection: function(window) {
                  var browserDetails = utils.detectBrowser(window);
                  if (
                    window.RTCIceGatherer &&
                    (window.RTCIceCandidate ||
                      (window.RTCIceCandidate = function(args) {
                        return args;
                      }),
                    window.RTCSessionDescription ||
                      (window.RTCSessionDescription = function(args) {
                        return args;
                      }),
                    browserDetails.version < 15025)
                  ) {
                    var origMSTEnabled = Object.getOwnPropertyDescriptor(
                      window.MediaStreamTrack.prototype,
                      "enabled"
                    );
                    Object.defineProperty(
                      window.MediaStreamTrack.prototype,
                      "enabled",
                      {
                        set: function(value) {
                          origMSTEnabled.set.call(this, value);
                          var ev = new Event("enabled");
                          (ev.enabled = value), this.dispatchEvent(ev);
                        }
                      }
                    );
                  }
                  !window.RTCRtpSender ||
                    "dtmf" in window.RTCRtpSender.prototype ||
                    Object.defineProperty(
                      window.RTCRtpSender.prototype,
                      "dtmf",
                      {
                        get: function() {
                          return (
                            void 0 === this._dtmf &&
                              ("audio" === this.track.kind
                                ? (this._dtmf = new window.RTCDtmfSender(this))
                                : "video" === this.track.kind &&
                                  (this._dtmf = null)),
                            this._dtmf
                          );
                        }
                      }
                    ),
                    window.RTCDtmfSender &&
                      !window.RTCDTMFSender &&
                      (window.RTCDTMFSender = window.RTCDtmfSender);
                  var RTCPeerConnectionShim = shimRTCPeerConnection(
                    window,
                    browserDetails.version
                  );
                  (window.RTCPeerConnection = function(config) {
                    return (
                      config &&
                        config.iceServers &&
                        (config.iceServers = filterIceServers(
                          config.iceServers
                        )),
                      new RTCPeerConnectionShim(config)
                    );
                  }),
                    (window.RTCPeerConnection.prototype =
                      RTCPeerConnectionShim.prototype);
                },
                shimReplaceTrack: function(window) {
                  !window.RTCRtpSender ||
                    "replaceTrack" in window.RTCRtpSender.prototype ||
                    (window.RTCRtpSender.prototype.replaceTrack =
                      window.RTCRtpSender.prototype.setTrack);
                }
              };
            },
            {
              "../utils": 14,
              "./filtericeservers": 9,
              "./getusermedia": 10,
              "rtcpeerconnection-shim": 1
            }
          ],
          9: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("../utils");
              module.exports = function(iceServers, edgeVersion) {
                var hasTurn = !1;
                return (
                  (iceServers = JSON.parse(JSON.stringify(iceServers))),
                  iceServers.filter(function(server) {
                    if (server && (server.urls || server.url)) {
                      var urls = server.urls || server.url;
                      server.url &&
                        !server.urls &&
                        utils.deprecated(
                          "RTCIceServer.url",
                          "RTCIceServer.urls"
                        );
                      var isString = "string" == typeof urls;
                      return (
                        isString && (urls = [urls]),
                        (urls = urls.filter(function(url) {
                          return 0 !== url.indexOf("turn:") ||
                            -1 === url.indexOf("transport=udp") ||
                            -1 !== url.indexOf("turn:[") ||
                            hasTurn
                            ? 0 === url.indexOf("stun:") &&
                                edgeVersion >= 14393 &&
                                -1 === url.indexOf("?transport=udp")
                            : ((hasTurn = !0), !0);
                        })),
                        delete server.url,
                        (server.urls = isString ? urls[0] : urls),
                        !!urls.length
                      );
                    }
                  })
                );
              };
            },
            { "../utils": 14 }
          ],
          10: [
            function(requirecopy, module, exports) {
              module.exports = function(window) {
                var navigator = window && window.navigator,
                  shimError_ = function(e) {
                    return {
                      name:
                        { PermissionDeniedError: "NotAllowedError" }[e.name] ||
                        e.name,
                      message: e.message,
                      constraint: e.constraint,
                      toString: function() {
                        return this.name;
                      }
                    };
                  },
                  origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
                    navigator.mediaDevices
                  );
                navigator.mediaDevices.getUserMedia = function(c) {
                  return origGetUserMedia(c).catch(function(e) {
                    return Promise.reject(shimError_(e));
                  });
                };
              };
            },
            {}
          ],
          11: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("../utils");
              module.exports = {
                shimGetUserMedia: requirecopy("./getusermedia"),
                shimOnTrack: function(window) {
                  "object" != typeof window ||
                    !window.RTCPeerConnection ||
                    "ontrack" in window.RTCPeerConnection.prototype ||
                    Object.defineProperty(
                      window.RTCPeerConnection.prototype,
                      "ontrack",
                      {
                        get: function() {
                          return this._ontrack;
                        },
                        set: function(f) {
                          this._ontrack &&
                            (this.removeEventListener("track", this._ontrack),
                            this.removeEventListener(
                              "addstream",
                              this._ontrackpoly
                            )),
                            this.addEventListener("track", (this._ontrack = f)),
                            this.addEventListener(
                              "addstream",
                              (this._ontrackpoly = function(e) {
                                e.stream.getTracks().forEach(
                                  function(track) {
                                    var event = new Event("track");
                                    (event.track = track),
                                      (event.receiver = { track: track }),
                                      (event.transceiver = {
                                        receiver: event.receiver
                                      }),
                                      (event.streams = [e.stream]),
                                      this.dispatchEvent(event);
                                  }.bind(this)
                                );
                              }.bind(this))
                            );
                        },
                        enumerable: !0,
                        configurable: !0
                      }
                    ),
                    "object" == typeof window &&
                      window.RTCTrackEvent &&
                      "receiver" in window.RTCTrackEvent.prototype &&
                      !("transceiver" in window.RTCTrackEvent.prototype) &&
                      Object.defineProperty(
                        window.RTCTrackEvent.prototype,
                        "transceiver",
                        {
                          get: function() {
                            return { receiver: this.receiver };
                          }
                        }
                      );
                },
                shimSourceObject: function(window) {
                  "object" == typeof window &&
                    (!window.HTMLMediaElement ||
                      "srcObject" in window.HTMLMediaElement.prototype ||
                      Object.defineProperty(
                        window.HTMLMediaElement.prototype,
                        "srcObject",
                        {
                          get: function() {
                            return this.mozSrcObject;
                          },
                          set: function(stream) {
                            this.mozSrcObject = stream;
                          }
                        }
                      ));
                },
                shimPeerConnection: function(window) {
                  var browserDetails = utils.detectBrowser(window);
                  if (
                    "object" == typeof window &&
                    (window.RTCPeerConnection || window.mozRTCPeerConnection)
                  ) {
                    window.RTCPeerConnection ||
                      ((window.RTCPeerConnection = function(
                        pcConfig,
                        pcConstraints
                      ) {
                        if (
                          browserDetails.version < 38 &&
                          pcConfig &&
                          pcConfig.iceServers
                        ) {
                          for (
                            var newIceServers = [], i = 0;
                            i < pcConfig.iceServers.length;
                            i++
                          ) {
                            var server = pcConfig.iceServers[i];
                            if (server.hasOwnProperty("urls"))
                              for (var j = 0; j < server.urls.length; j++) {
                                var newServer = { url: server.urls[j] };
                                0 === server.urls[j].indexOf("turn") &&
                                  ((newServer.username = server.username),
                                  (newServer.credential = server.credential)),
                                  newIceServers.push(newServer);
                              }
                            else newIceServers.push(pcConfig.iceServers[i]);
                          }
                          pcConfig.iceServers = newIceServers;
                        }
                        return new window.mozRTCPeerConnection(
                          pcConfig,
                          pcConstraints
                        );
                      }),
                      (window.RTCPeerConnection.prototype =
                        window.mozRTCPeerConnection.prototype),
                      window.mozRTCPeerConnection.generateCertificate &&
                        Object.defineProperty(
                          window.RTCPeerConnection,
                          "generateCertificate",
                          {
                            get: function() {
                              return window.mozRTCPeerConnection
                                .generateCertificate;
                            }
                          }
                        ),
                      (window.RTCSessionDescription =
                        window.mozRTCSessionDescription),
                      (window.RTCIceCandidate = window.mozRTCIceCandidate)),
                      [
                        "setLocalDescription",
                        "setRemoteDescription",
                        "addIceCandidate"
                      ].forEach(function(method) {
                        var nativeMethod =
                          window.RTCPeerConnection.prototype[method];
                        window.RTCPeerConnection.prototype[
                          method
                        ] = function() {
                          return (
                            (arguments[0] = new ("addIceCandidate" === method
                              ? window.RTCIceCandidate
                              : window.RTCSessionDescription)(arguments[0])),
                            nativeMethod.apply(this, arguments)
                          );
                        };
                      });
                    var nativeAddIceCandidate =
                      window.RTCPeerConnection.prototype.addIceCandidate;
                    window.RTCPeerConnection.prototype.addIceCandidate = function() {
                      return arguments[0]
                        ? nativeAddIceCandidate.apply(this, arguments)
                        : (arguments[1] && arguments[1].apply(null),
                          Promise.resolve());
                    };
                    var makeMapStats = function(stats) {
                        var map = new Map();
                        return (
                          Object.keys(stats).forEach(function(key) {
                            map.set(key, stats[key]), (map[key] = stats[key]);
                          }),
                          map
                        );
                      },
                      modernStatsTypes = {
                        inboundrtp: "inbound-rtp",
                        outboundrtp: "outbound-rtp",
                        candidatepair: "candidate-pair",
                        localcandidate: "local-candidate",
                        remotecandidate: "remote-candidate"
                      },
                      nativeGetStats =
                        window.RTCPeerConnection.prototype.getStats;
                    window.RTCPeerConnection.prototype.getStats = function(
                      selector,
                      onSucc,
                      onErr
                    ) {
                      return nativeGetStats
                        .apply(this, [selector || null])
                        .then(function(stats) {
                          if (
                            (browserDetails.version < 48 &&
                              (stats = makeMapStats(stats)),
                            browserDetails.version < 53 && !onSucc)
                          )
                            try {
                              stats.forEach(function(stat) {
                                stat.type =
                                  modernStatsTypes[stat.type] || stat.type;
                              });
                            } catch (e) {
                              if ("TypeError" !== e.name) throw e;
                              stats.forEach(function(stat, i) {
                                stats.set(
                                  i,
                                  Object.assign({}, stat, {
                                    type:
                                      modernStatsTypes[stat.type] || stat.type
                                  })
                                );
                              });
                            }
                          return stats;
                        })
                        .then(onSucc, onErr);
                    };
                  }
                },
                shimSenderGetStats: function(window) {
                  if (
                    "object" == typeof window &&
                    window.RTCPeerConnection &&
                    window.RTCRtpSender &&
                    !(
                      window.RTCRtpSender &&
                      "getStats" in window.RTCRtpSender.prototype
                    )
                  ) {
                    var origGetSenders =
                      window.RTCPeerConnection.prototype.getSenders;
                    origGetSenders &&
                      (window.RTCPeerConnection.prototype.getSenders = function() {
                        var pc = this,
                          senders = origGetSenders.apply(pc, []);
                        return (
                          senders.forEach(function(sender) {
                            sender._pc = pc;
                          }),
                          senders
                        );
                      });
                    var origAddTrack =
                      window.RTCPeerConnection.prototype.addTrack;
                    origAddTrack &&
                      (window.RTCPeerConnection.prototype.addTrack = function() {
                        var sender = origAddTrack.apply(this, arguments);
                        return (sender._pc = this), sender;
                      }),
                      (window.RTCRtpSender.prototype.getStats = function() {
                        return this.track
                          ? this._pc.getStats(this.track)
                          : Promise.resolve(new Map());
                      });
                  }
                },
                shimReceiverGetStats: function(window) {
                  if (
                    "object" == typeof window &&
                    window.RTCPeerConnection &&
                    window.RTCRtpSender &&
                    !(
                      window.RTCRtpSender &&
                      "getStats" in window.RTCRtpReceiver.prototype
                    )
                  ) {
                    var origGetReceivers =
                      window.RTCPeerConnection.prototype.getReceivers;
                    origGetReceivers &&
                      (window.RTCPeerConnection.prototype.getReceivers = function() {
                        var pc = this,
                          receivers = origGetReceivers.apply(pc, []);
                        return (
                          receivers.forEach(function(receiver) {
                            receiver._pc = pc;
                          }),
                          receivers
                        );
                      }),
                      utils.wrapPeerConnectionEvent(window, "track", function(
                        e
                      ) {
                        return (e.receiver._pc = e.srcElement), e;
                      }),
                      (window.RTCRtpReceiver.prototype.getStats = function() {
                        return this._pc.getStats(this.track);
                      });
                  }
                },
                shimRemoveStream: function(window) {
                  !window.RTCPeerConnection ||
                    "removeStream" in window.RTCPeerConnection.prototype ||
                    (window.RTCPeerConnection.prototype.removeStream = function(
                      stream
                    ) {
                      var pc = this;
                      utils.deprecated("removeStream", "removeTrack"),
                        this.getSenders().forEach(function(sender) {
                          sender.track &&
                            -1 !== stream.getTracks().indexOf(sender.track) &&
                            pc.removeTrack(sender);
                        });
                    });
                },
                shimRTCDataChannel: function(window) {
                  window.DataChannel &&
                    !window.RTCDataChannel &&
                    (window.RTCDataChannel = window.DataChannel);
                },
                shimGetDisplayMedia: function(window, preferredMediaSource) {
                  "getDisplayMedia" in window.navigator ||
                    (navigator.getDisplayMedia = function(constraints) {
                      if (!constraints || !constraints.video) {
                        var err = new DOMException(
                          "getDisplayMedia without video constraints is undefined"
                        );
                        return (
                          (err.name = "NotFoundError"),
                          (err.code = 8),
                          Promise.reject(err)
                        );
                      }
                      return (
                        !0 === constraints.video
                          ? (constraints.video = {
                              mediaSource: preferredMediaSource
                            })
                          : (constraints.video.mediaSource = preferredMediaSource),
                        navigator.mediaDevices.getUserMedia(constraints)
                      );
                    });
                }
              };
            },
            { "../utils": 14, "./getusermedia": 12 }
          ],
          12: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("../utils"),
                logging = utils.log;
              module.exports = function(window) {
                var browserDetails = utils.detectBrowser(window),
                  navigator = window && window.navigator,
                  MediaStreamTrack = window && window.MediaStreamTrack,
                  shimError_ = function(e) {
                    return {
                      name:
                        {
                          InternalError: "NotReadableError",
                          NotSupportedError: "TypeError",
                          PermissionDeniedError: "NotAllowedError",
                          SecurityError: "NotAllowedError"
                        }[e.name] || e.name,
                      message:
                        {
                          "The operation is insecure.":
                            "The request is not allowed by the user agent or the platform in the current context."
                        }[e.message] || e.message,
                      constraint: e.constraint,
                      toString: function() {
                        return (
                          this.name + (this.message && ": ") + this.message
                        );
                      }
                    };
                  },
                  getUserMedia_ = function(constraints, onSuccess, onError) {
                    var constraintsToFF37_ = function(c) {
                      if ("object" != typeof c || c.require) return c;
                      var require = [];
                      return (
                        Object.keys(c).forEach(function(key) {
                          if (
                            "require" !== key &&
                            "advanced" !== key &&
                            "mediaSource" !== key
                          ) {
                            var r = (c[key] =
                              "object" == typeof c[key]
                                ? c[key]
                                : { ideal: c[key] });
                            if (
                              ((void 0 === r.min &&
                                void 0 === r.max &&
                                void 0 === r.exact) ||
                                require.push(key),
                              void 0 !== r.exact &&
                                ("number" == typeof r.exact
                                  ? (r.min = r.max = r.exact)
                                  : (c[key] = r.exact),
                                delete r.exact),
                              void 0 !== r.ideal)
                            ) {
                              c.advanced = c.advanced || [];
                              var oc = {};
                              "number" == typeof r.ideal
                                ? (oc[key] = { min: r.ideal, max: r.ideal })
                                : (oc[key] = r.ideal),
                                c.advanced.push(oc),
                                delete r.ideal,
                                Object.keys(r).length || delete c[key];
                            }
                          }
                        }),
                        require.length && (c.require = require),
                        c
                      );
                    };
                    return (
                      (constraints = JSON.parse(JSON.stringify(constraints))),
                      browserDetails.version < 38 &&
                        (logging("spec: " + JSON.stringify(constraints)),
                        constraints.audio &&
                          (constraints.audio = constraintsToFF37_(
                            constraints.audio
                          )),
                        constraints.video &&
                          (constraints.video = constraintsToFF37_(
                            constraints.video
                          )),
                        logging("ff37: " + JSON.stringify(constraints))),
                      navigator.mozGetUserMedia(
                        constraints,
                        onSuccess,
                        function(e) {
                          onError(shimError_(e));
                        }
                      )
                    );
                  },
                  getUserMediaPromise_ = function(constraints) {
                    return new Promise(function(resolve, reject) {
                      getUserMedia_(constraints, resolve, reject);
                    });
                  };
                if (
                  (navigator.mediaDevices ||
                    (navigator.mediaDevices = {
                      getUserMedia: getUserMediaPromise_,
                      addEventListener: function() {},
                      removeEventListener: function() {}
                    }),
                  (navigator.mediaDevices.enumerateDevices =
                    navigator.mediaDevices.enumerateDevices ||
                    function() {
                      return new Promise(function(resolve) {
                        resolve([
                          {
                            kind: "audioinput",
                            deviceId: "default",
                            label: "",
                            groupId: ""
                          },
                          {
                            kind: "videoinput",
                            deviceId: "default",
                            label: "",
                            groupId: ""
                          }
                        ]);
                      });
                    }),
                  browserDetails.version < 41)
                ) {
                  var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(
                    navigator.mediaDevices
                  );
                  navigator.mediaDevices.enumerateDevices = function() {
                    return orgEnumerateDevices().then(void 0, function(e) {
                      if ("NotFoundError" === e.name) return [];
                      throw e;
                    });
                  };
                }
                if (browserDetails.version < 49) {
                  var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
                    navigator.mediaDevices
                  );
                  navigator.mediaDevices.getUserMedia = function(c) {
                    return origGetUserMedia(c).then(
                      function(stream) {
                        if (
                          (c.audio && !stream.getAudioTracks().length) ||
                          (c.video && !stream.getVideoTracks().length)
                        )
                          throw (stream.getTracks().forEach(function(track) {
                            track.stop();
                          }),
                          new DOMException(
                            "The object can not be found here.",
                            "NotFoundError"
                          ));
                        return stream;
                      },
                      function(e) {
                        return Promise.reject(shimError_(e));
                      }
                    );
                  };
                }
                if (
                  !(
                    browserDetails.version > 55 &&
                    "autoGainControl" in
                      navigator.mediaDevices.getSupportedConstraints()
                  )
                ) {
                  var remap = function(obj, a, b) {
                      a in obj &&
                        !(b in obj) &&
                        ((obj[b] = obj[a]), delete obj[a]);
                    },
                    nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
                      navigator.mediaDevices
                    );
                  if (
                    ((navigator.mediaDevices.getUserMedia = function(c) {
                      return (
                        "object" == typeof c &&
                          "object" == typeof c.audio &&
                          ((c = JSON.parse(JSON.stringify(c))),
                          remap(
                            c.audio,
                            "autoGainControl",
                            "mozAutoGainControl"
                          ),
                          remap(
                            c.audio,
                            "noiseSuppression",
                            "mozNoiseSuppression"
                          )),
                        nativeGetUserMedia(c)
                      );
                    }),
                    MediaStreamTrack && MediaStreamTrack.prototype.getSettings)
                  ) {
                    var nativeGetSettings =
                      MediaStreamTrack.prototype.getSettings;
                    MediaStreamTrack.prototype.getSettings = function() {
                      var obj = nativeGetSettings.apply(this, arguments);
                      return (
                        remap(obj, "mozAutoGainControl", "autoGainControl"),
                        remap(obj, "mozNoiseSuppression", "noiseSuppression"),
                        obj
                      );
                    };
                  }
                  if (
                    MediaStreamTrack &&
                    MediaStreamTrack.prototype.applyConstraints
                  ) {
                    var nativeApplyConstraints =
                      MediaStreamTrack.prototype.applyConstraints;
                    MediaStreamTrack.prototype.applyConstraints = function(c) {
                      return (
                        "audio" === this.kind &&
                          "object" == typeof c &&
                          ((c = JSON.parse(JSON.stringify(c))),
                          remap(c, "autoGainControl", "mozAutoGainControl"),
                          remap(c, "noiseSuppression", "mozNoiseSuppression")),
                        nativeApplyConstraints.apply(this, [c])
                      );
                    };
                  }
                }
                navigator.getUserMedia = function(
                  constraints,
                  onSuccess,
                  onError
                ) {
                  if (browserDetails.version < 44)
                    return getUserMedia_(constraints, onSuccess, onError);
                  utils.deprecated(
                    "navigator.getUserMedia",
                    "navigator.mediaDevices.getUserMedia"
                  ),
                    navigator.mediaDevices
                      .getUserMedia(constraints)
                      .then(onSuccess, onError);
                };
              };
            },
            { "../utils": 14 }
          ],
          13: [
            function(requirecopy, module, exports) {
              var utils = requirecopy("../utils");
              module.exports = {
                shimLocalStreamsAPI: function(window) {
                  if ("object" == typeof window && window.RTCPeerConnection) {
                    if (
                      ("getLocalStreams" in
                        window.RTCPeerConnection.prototype ||
                        (window.RTCPeerConnection.prototype.getLocalStreams = function() {
                          return (
                            this._localStreams || (this._localStreams = []),
                            this._localStreams
                          );
                        }),
                      "getStreamById" in window.RTCPeerConnection.prototype ||
                        (window.RTCPeerConnection.prototype.getStreamById = function(
                          id
                        ) {
                          var result = null;
                          return (
                            this._localStreams &&
                              this._localStreams.forEach(function(stream) {
                                stream.id === id && (result = stream);
                              }),
                            this._remoteStreams &&
                              this._remoteStreams.forEach(function(stream) {
                                stream.id === id && (result = stream);
                              }),
                            result
                          );
                        }),
                      !("addStream" in window.RTCPeerConnection.prototype))
                    ) {
                      var _addTrack =
                        window.RTCPeerConnection.prototype.addTrack;
                      (window.RTCPeerConnection.prototype.addStream = function(
                        stream
                      ) {
                        this._localStreams || (this._localStreams = []),
                          -1 === this._localStreams.indexOf(stream) &&
                            this._localStreams.push(stream);
                        var pc = this;
                        stream.getTracks().forEach(function(track) {
                          _addTrack.call(pc, track, stream);
                        });
                      }),
                        (window.RTCPeerConnection.prototype.addTrack = function(
                          track,
                          stream
                        ) {
                          return (
                            stream &&
                              (this._localStreams
                                ? -1 === this._localStreams.indexOf(stream) &&
                                  this._localStreams.push(stream)
                                : (this._localStreams = [stream])),
                            _addTrack.call(this, track, stream)
                          );
                        });
                    }
                    "removeStream" in window.RTCPeerConnection.prototype ||
                      (window.RTCPeerConnection.prototype.removeStream = function(
                        stream
                      ) {
                        this._localStreams || (this._localStreams = []);
                        var index = this._localStreams.indexOf(stream);
                        if (-1 !== index) {
                          this._localStreams.splice(index, 1);
                          var pc = this,
                            tracks = stream.getTracks();
                          this.getSenders().forEach(function(sender) {
                            -1 !== tracks.indexOf(sender.track) &&
                              pc.removeTrack(sender);
                          });
                        }
                      });
                  }
                },
                shimRemoteStreamsAPI: function(window) {
                  if (
                    "object" == typeof window &&
                    window.RTCPeerConnection &&
                    ("getRemoteStreams" in window.RTCPeerConnection.prototype ||
                      (window.RTCPeerConnection.prototype.getRemoteStreams = function() {
                        return this._remoteStreams ? this._remoteStreams : [];
                      }),
                    !("onaddstream" in window.RTCPeerConnection.prototype))
                  ) {
                    Object.defineProperty(
                      window.RTCPeerConnection.prototype,
                      "onaddstream",
                      {
                        get: function() {
                          return this._onaddstream;
                        },
                        set: function(f) {
                          this._onaddstream &&
                            this.removeEventListener(
                              "addstream",
                              this._onaddstream
                            ),
                            this.addEventListener(
                              "addstream",
                              (this._onaddstream = f)
                            );
                        }
                      }
                    );
                    var origSetRemoteDescription =
                      window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
                      var pc = this;
                      return (
                        this._onaddstreampoly ||
                          this.addEventListener(
                            "track",
                            (this._onaddstreampoly = function(e) {
                              e.streams.forEach(function(stream) {
                                if (
                                  (pc._remoteStreams ||
                                    (pc._remoteStreams = []),
                                  !(pc._remoteStreams.indexOf(stream) >= 0))
                                ) {
                                  pc._remoteStreams.push(stream);
                                  var event = new Event("addstream");
                                  (event.stream = stream),
                                    pc.dispatchEvent(event);
                                }
                              });
                            })
                          ),
                        origSetRemoteDescription.apply(pc, arguments)
                      );
                    };
                  }
                },
                shimCallbacksAPI: function(window) {
                  if ("object" == typeof window && window.RTCPeerConnection) {
                    var prototype = window.RTCPeerConnection.prototype,
                      createOffer = prototype.createOffer,
                      createAnswer = prototype.createAnswer,
                      setLocalDescription = prototype.setLocalDescription,
                      setRemoteDescription = prototype.setRemoteDescription,
                      addIceCandidate = prototype.addIceCandidate;
                    (prototype.createOffer = function(
                      successCallback,
                      failureCallback
                    ) {
                      var options =
                          arguments.length >= 2 ? arguments[2] : arguments[0],
                        promise = createOffer.apply(this, [options]);
                      return failureCallback
                        ? (promise.then(successCallback, failureCallback),
                          Promise.resolve())
                        : promise;
                    }),
                      (prototype.createAnswer = function(
                        successCallback,
                        failureCallback
                      ) {
                        var options =
                            arguments.length >= 2 ? arguments[2] : arguments[0],
                          promise = createAnswer.apply(this, [options]);
                        return failureCallback
                          ? (promise.then(successCallback, failureCallback),
                            Promise.resolve())
                          : promise;
                      });
                    var withCallback = function(
                      description,
                      successCallback,
                      failureCallback
                    ) {
                      var promise = setLocalDescription.apply(this, [
                        description
                      ]);
                      return failureCallback
                        ? (promise.then(successCallback, failureCallback),
                          Promise.resolve())
                        : promise;
                    };
                    (prototype.setLocalDescription = withCallback),
                      (withCallback = function(
                        description,
                        successCallback,
                        failureCallback
                      ) {
                        var promise = setRemoteDescription.apply(this, [
                          description
                        ]);
                        return failureCallback
                          ? (promise.then(successCallback, failureCallback),
                            Promise.resolve())
                          : promise;
                      }),
                      (prototype.setRemoteDescription = withCallback),
                      (withCallback = function(
                        candidate,
                        successCallback,
                        failureCallback
                      ) {
                        var promise = addIceCandidate.apply(this, [candidate]);
                        return failureCallback
                          ? (promise.then(successCallback, failureCallback),
                            Promise.resolve())
                          : promise;
                      }),
                      (prototype.addIceCandidate = withCallback);
                  }
                },
                shimGetUserMedia: function(window) {
                  var navigator = window && window.navigator;
                  navigator.getUserMedia ||
                    (navigator.webkitGetUserMedia
                      ? (navigator.getUserMedia = navigator.webkitGetUserMedia.bind(
                          navigator
                        ))
                      : navigator.mediaDevices &&
                        navigator.mediaDevices.getUserMedia &&
                        (navigator.getUserMedia = function(
                          constraints,
                          cb,
                          errcb
                        ) {
                          navigator.mediaDevices
                            .getUserMedia(constraints)
                            .then(cb, errcb);
                        }.bind(navigator)));
                },
                shimRTCIceServerUrls: function(window) {
                  var OrigPeerConnection = window.RTCPeerConnection;
                  (window.RTCPeerConnection = function(
                    pcConfig,
                    pcConstraints
                  ) {
                    if (pcConfig && pcConfig.iceServers) {
                      for (
                        var newIceServers = [], i = 0;
                        i < pcConfig.iceServers.length;
                        i++
                      ) {
                        var server = pcConfig.iceServers[i];
                        !server.hasOwnProperty("urls") &&
                        server.hasOwnProperty("url")
                          ? (utils.deprecated(
                              "RTCIceServer.url",
                              "RTCIceServer.urls"
                            ),
                            (server = JSON.parse(JSON.stringify(server))),
                            (server.urls = server.url),
                            delete server.url,
                            newIceServers.push(server))
                          : newIceServers.push(pcConfig.iceServers[i]);
                      }
                      pcConfig.iceServers = newIceServers;
                    }
                    return new OrigPeerConnection(pcConfig, pcConstraints);
                  }),
                    (window.RTCPeerConnection.prototype =
                      OrigPeerConnection.prototype),
                    "generateCertificate" in window.RTCPeerConnection &&
                      Object.defineProperty(
                        window.RTCPeerConnection,
                        "generateCertificate",
                        {
                          get: function() {
                            return OrigPeerConnection.generateCertificate;
                          }
                        }
                      );
                },
                shimTrackEventTransceiver: function(window) {
                  "object" == typeof window &&
                    window.RTCPeerConnection &&
                    "receiver" in window.RTCTrackEvent.prototype &&
                    !window.RTCTransceiver &&
                    Object.defineProperty(
                      window.RTCTrackEvent.prototype,
                      "transceiver",
                      {
                        get: function() {
                          return { receiver: this.receiver };
                        }
                      }
                    );
                },
                shimCreateOfferLegacy: function(window) {
                  var origCreateOffer =
                    window.RTCPeerConnection.prototype.createOffer;
                  window.RTCPeerConnection.prototype.createOffer = function(
                    offerOptions
                  ) {
                    var pc = this;
                    if (offerOptions) {
                      void 0 !== offerOptions.offerToReceiveAudio &&
                        (offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio);
                      var audioTransceiver = pc
                        .getTransceivers()
                        .find(function(transceiver) {
                          return (
                            transceiver.sender.track &&
                            "audio" === transceiver.sender.track.kind
                          );
                        });
                      !1 === offerOptions.offerToReceiveAudio &&
                      audioTransceiver
                        ? "sendrecv" === audioTransceiver.direction
                          ? audioTransceiver.setDirection
                            ? audioTransceiver.setDirection("sendonly")
                            : (audioTransceiver.direction = "sendonly")
                          : "recvonly" === audioTransceiver.direction &&
                            (audioTransceiver.setDirection
                              ? audioTransceiver.setDirection("inactive")
                              : (audioTransceiver.direction = "inactive"))
                        : !0 !== offerOptions.offerToReceiveAudio ||
                          audioTransceiver ||
                          pc.addTransceiver("audio"),
                        void 0 !== offerOptions.offerToReceiveVideo &&
                          (offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo);
                      var videoTransceiver = pc
                        .getTransceivers()
                        .find(function(transceiver) {
                          return (
                            transceiver.sender.track &&
                            "video" === transceiver.sender.track.kind
                          );
                        });
                      !1 === offerOptions.offerToReceiveVideo &&
                      videoTransceiver
                        ? "sendrecv" === videoTransceiver.direction
                          ? videoTransceiver.setDirection("sendonly")
                          : "recvonly" === videoTransceiver.direction &&
                            videoTransceiver.setDirection("inactive")
                        : !0 !== offerOptions.offerToReceiveVideo ||
                          videoTransceiver ||
                          pc.addTransceiver("video");
                    }
                    return origCreateOffer.apply(pc, arguments);
                  };
                }
              };
            },
            { "../utils": 14 }
          ],
          14: [
            function(requirecopy, module, exports) {
              function extractVersion(uastring, expr, pos) {
                var match = uastring.match(expr);
                return match && match.length >= pos && parseInt(match[pos], 10);
              }
              function wrapPeerConnectionEvent(
                window,
                eventNameToWrap,
                wrapper
              ) {
                if (window.RTCPeerConnection) {
                  var proto = window.RTCPeerConnection.prototype,
                    nativeAddEventListener = proto.addEventListener;
                  proto.addEventListener = function(nativeEventName, cb) {
                    if (nativeEventName !== eventNameToWrap)
                      return nativeAddEventListener.apply(this, arguments);
                    var wrappedCallback = function(e) {
                      var modifiedEvent = wrapper(e);
                      modifiedEvent && cb(modifiedEvent);
                    };
                    return (
                      (this._eventMap = this._eventMap || {}),
                      (this._eventMap[cb] = wrappedCallback),
                      nativeAddEventListener.apply(this, [
                        nativeEventName,
                        wrappedCallback
                      ])
                    );
                  };
                  var nativeRemoveEventListener = proto.removeEventListener;
                  (proto.removeEventListener = function(nativeEventName, cb) {
                    if (
                      nativeEventName !== eventNameToWrap ||
                      !this._eventMap ||
                      !this._eventMap[cb]
                    )
                      return nativeRemoveEventListener.apply(this, arguments);
                    var unwrappedCb = this._eventMap[cb];
                    return (
                      delete this._eventMap[cb],
                      nativeRemoveEventListener.apply(this, [
                        nativeEventName,
                        unwrappedCb
                      ])
                    );
                  }),
                    Object.defineProperty(proto, "on" + eventNameToWrap, {
                      get: function() {
                        return this["_on" + eventNameToWrap];
                      },
                      set: function(cb) {
                        this["_on" + eventNameToWrap] &&
                          (this.removeEventListener(
                            eventNameToWrap,
                            this["_on" + eventNameToWrap]
                          ),
                          delete this["_on" + eventNameToWrap]),
                          cb &&
                            this.addEventListener(
                              eventNameToWrap,
                              (this["_on" + eventNameToWrap] = cb)
                            );
                      },
                      enumerable: !0,
                      configurable: !0
                    });
                }
              }
              var logDisabled_ = !0,
                deprecationWarnings_ = !0;
              module.exports = {
                extractVersion: extractVersion,
                wrapPeerConnectionEvent: wrapPeerConnectionEvent,
                disableLog: function(bool) {
                  return "boolean" != typeof bool
                    ? new Error(
                        "Argument type: " +
                          typeof bool +
                          ". Please use a boolean."
                      )
                    : ((logDisabled_ = bool),
                      bool
                        ? "adapter.js logging disabled"
                        : "adapter.js logging enabled");
                },
                disableWarnings: function(bool) {
                  return "boolean" != typeof bool
                    ? new Error(
                        "Argument type: " +
                          typeof bool +
                          ". Please use a boolean."
                      )
                    : ((deprecationWarnings_ = !bool),
                      "adapter.js deprecation warnings " +
                        (bool ? "disabled" : "enabled"));
                },
                log: function() {
                  if ("object" == typeof window) {
                    if (logDisabled_) return;
                    "undefined" != typeof console && console.log;
                  }
                },
                deprecated: function(oldMethod, newMethod) {},
                detectBrowser: function(window) {
                  var navigator = window && window.navigator,
                    result = {};
                  if (
                    ((result.browser = null),
                    (result.version = null),
                    void 0 === window || !window.navigator)
                  )
                    return (result.browser = "Not a browser."), result;
                  if (navigator.mozGetUserMedia)
                    (result.browser = "firefox"),
                      (result.version = extractVersion(
                        navigator.userAgent,
                        /Firefox\/(\d+)\./,
                        1
                      ));
                  else if (navigator.webkitGetUserMedia)
                    (result.browser = "chrome"),
                      (result.version = extractVersion(
                        navigator.userAgent,
                        /Chrom(e|ium)\/(\d+)\./,
                        2
                      ));
                  else if (
                    navigator.mediaDevices &&
                    navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)
                  )
                    (result.browser = "edge"),
                      (result.version = extractVersion(
                        navigator.userAgent,
                        /Edge\/(\d+).(\d+)$/,
                        2
                      ));
                  else {
                    if (
                      !window.RTCPeerConnection ||
                      !navigator.userAgent.match(/AppleWebKit\/(\d+)\./)
                    )
                      return (
                        (result.browser = "Not a supported browser."), result
                      );
                    (result.browser = "safari"),
                      (result.version = extractVersion(
                        navigator.userAgent,
                        /AppleWebKit\/(\d+)\./,
                        1
                      ));
                  }
                  return result;
                }
              };
            },
            {}
          ]
        },
        {},
        [3]
      )(3);
    }),
    navigator.mozGetUserMedia
      ? ((MediaStreamTrack.getSources = function(successCb) {
          setTimeout(function() {
            successCb([
              { kind: "audio", id: "default", label: "", facing: "" },
              { kind: "video", id: "default", label: "", facing: "" }
            ]);
          }, 0);
        }),
        (attachMediaStream = function(element, stream) {
          return (element.srcObject = stream), element;
        }),
        (reattachMediaStream = function(to, from) {
          return (to.srcObject = from.srcObject), to;
        }))
      : navigator.webkitGetUserMedia
      ? ((attachMediaStream = function(element, stream) {
          return (
            AdapterJS.webrtcDetectedVersion >= 43
              ? (element.srcObject = stream)
              : void 0 !== element.src &&
                (element.src = URL.createObjectURL(stream)),
            element
          );
        }),
        (reattachMediaStream = function(to, from) {
          return (
            AdapterJS.webrtcDetectedVersion >= 43
              ? (to.srcObject = from.srcObject)
              : (to.src = from.src),
            to
          );
        }))
      : "AppleWebKit" === AdapterJS.webrtcDetectedType
      ? ((attachMediaStream = function(element, stream) {
          return (element.srcObject = stream), element;
        }),
        (reattachMediaStream = function(to, from) {
          return (to.srcObject = from.srcObject), to;
        }),
        navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia &&
          (navigator.getUserMedia = getUserMedia = function(
            constraints,
            successCb,
            errorCb
          ) {
            navigator.mediaDevices
              .getUserMedia(constraints)
              .then(successCb)
              .catch(errorCb);
          }))
      : navigator.mediaDevices &&
        navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) &&
        ((attachMediaStream = function(element, stream) {
          return (element.srcObject = stream), element;
        }),
        (reattachMediaStream = function(to, from) {
          return (to.srcObject = from.srcObject), to;
        }));
  var attachMediaStream_base = attachMediaStream;
  "opera" === AdapterJS.webrtcDetectedBrowser &&
    (attachMediaStream_base = function(element, stream) {
      AdapterJS.webrtcDetectedVersion > 38
        ? (element.srcObject = stream)
        : void 0 !== element.src && (element.src = URL.createObjectURL(stream));
    }),
    (attachMediaStream = function(element, stream) {
      return (
        ("chrome" !== AdapterJS.webrtcDetectedBrowser &&
          "opera" !== AdapterJS.webrtcDetectedBrowser) ||
        stream
          ? attachMediaStream_base(element, stream)
          : (element.src = ""),
        element
      );
    });
  var reattachMediaStream_base = reattachMediaStream;
  (reattachMediaStream = function(to, from) {
    return reattachMediaStream_base(to, from), to;
  }),
    (window.attachMediaStream = attachMediaStream),
    (window.reattachMediaStream = reattachMediaStream),
    (window.getUserMedia = function(constraints, onSuccess, onFailure) {
      navigator.getUserMedia(constraints, onSuccess, onFailure);
    }),
    (AdapterJS.attachMediaStream = attachMediaStream),
    (AdapterJS.reattachMediaStream = reattachMediaStream),
    (AdapterJS.getUserMedia = getUserMedia),
    "undefined" == typeof Promise && (requestUserMedia = null),
    AdapterJS.maybeThroughWebRTCReady();
} else
  ("object" == typeof console && "function" == typeof console.log) ||
    ((console = {} || console),
    (console.log = function(arg) {}),
    (console.info = function(arg) {}),
    (console.error = function(arg) {}),
    (console.dir = function(arg) {}),
    (console.exception = function(arg) {}),
    (console.trace = function(arg) {}),
    (console.warn = function(arg) {}),
    (console.count = function(arg) {}),
    (console.debug = function(arg) {}),
    (console.count = function(arg) {}),
    (console.time = function(arg) {}),
    (console.timeEnd = function(arg) {}),
    (console.group = function(arg) {}),
    (console.groupCollapsed = function(arg) {}),
    (console.groupEnd = function(arg) {})),
    (AdapterJS.WebRTCPlugin.WaitForPluginReady = function() {
      for (
        ;
        AdapterJS.WebRTCPlugin.pluginState !==
        AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY;

      );
    }),
    (AdapterJS.WebRTCPlugin.callWhenPluginReady = function(callback) {
      if (
        AdapterJS.WebRTCPlugin.pluginState ===
        AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY
      )
        callback();
      else
        var checkPluginReadyState = setInterval(function() {
          AdapterJS.WebRTCPlugin.pluginState ===
            AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY &&
            (clearInterval(checkPluginReadyState), callback());
        }, 100);
    }),
    (AdapterJS.WebRTCPlugin.setLogLevel = function(logLevel) {
      AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
        AdapterJS.WebRTCPlugin.plugin.setLogLevel(logLevel);
      });
    }),
    (AdapterJS.WebRTCPlugin.injectPlugin = function() {
      if (
        AdapterJS.documentReady() &&
        AdapterJS.WebRTCPlugin.pluginState ===
          AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING
      ) {
        AdapterJS.WebRTCPlugin.pluginState =
          AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTING;
        var existing = document.getElementById(
          AdapterJS.WebRTCPlugin.pluginInfo.pluginId
        );
        if (existing)
          if (
            ((AdapterJS.WebRTCPlugin.plugin = existing),
            (AdapterJS.WebRTCPlugin.pluginState =
              AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTED),
            AdapterJS.WebRTCPlugin.plugin.valid)
          )
            window[AdapterJS.WebRTCPlugin.pluginInfo.onload]();
          else
            var pluginValidInterval = setInterval(function() {
              AdapterJS.WebRTCPlugin.plugin.valid &&
                (clearInterval(pluginValidInterval),
                window[AdapterJS.WebRTCPlugin.pluginInfo.onload]());
            }, 100);
        else {
          if (
            "IE" === AdapterJS.webrtcDetectedBrowser &&
            AdapterJS.webrtcDetectedVersion <= 10
          ) {
            var frag = document.createDocumentFragment();
            for (
              AdapterJS.WebRTCPlugin.plugin = document.createElement("div"),
                AdapterJS.WebRTCPlugin.plugin.innerHTML =
                  '<object id="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.pluginId +
                  '" type="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.type +
                  '" width="1" height="1"><param name="pluginId" value="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.pluginId +
                  '" /> <param name="windowless" value="false" /> <param name="pageId" value="' +
                  AdapterJS.WebRTCPlugin.pageId +
                  '" /> <param name="onload" value="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.onload +
                  '" /><param name="tag" value="' +
                  AdapterJS.WebRTCPlugin.TAGS.NONE +
                  '" />' +
                  (AdapterJS.options.getAllCams
                    ? '<param name="forceGetAllCams" value="True" />'
                    : "") +
                  "</object>";
              AdapterJS.WebRTCPlugin.plugin.firstChild;

            )
              frag.appendChild(AdapterJS.WebRTCPlugin.plugin.firstChild);
            document.body.appendChild(frag),
              (AdapterJS.WebRTCPlugin.plugin = document.getElementById(
                AdapterJS.WebRTCPlugin.pluginInfo.pluginId
              ));
          } else
            (AdapterJS.WebRTCPlugin.plugin = document.createElement("object")),
              (AdapterJS.WebRTCPlugin.plugin.id =
                AdapterJS.WebRTCPlugin.pluginInfo.pluginId),
              "IE" === AdapterJS.webrtcDetectedBrowser
                ? ((AdapterJS.WebRTCPlugin.plugin.width = "1px"),
                  (AdapterJS.WebRTCPlugin.plugin.height = "1px"))
                : ((AdapterJS.WebRTCPlugin.plugin.width = "0px"),
                  (AdapterJS.WebRTCPlugin.plugin.height = "0px")),
              (AdapterJS.WebRTCPlugin.plugin.type =
                AdapterJS.WebRTCPlugin.pluginInfo.type),
              (AdapterJS.WebRTCPlugin.plugin.innerHTML =
                '<param name="onload" value="' +
                AdapterJS.WebRTCPlugin.pluginInfo.onload +
                '"><param name="pluginId" value="' +
                AdapterJS.WebRTCPlugin.pluginInfo.pluginId +
                '"><param name="windowless" value="false" /> ' +
                (AdapterJS.options.getAllCams
                  ? '<param name="forceGetAllCams" value="True" />'
                  : "") +
                '<param name="pageId" value="' +
                AdapterJS.WebRTCPlugin.pageId +
                '"><param name="tag" value="' +
                AdapterJS.WebRTCPlugin.TAGS.NONE +
                '" />'),
              document.body.appendChild(AdapterJS.WebRTCPlugin.plugin);
          AdapterJS.WebRTCPlugin.pluginState =
            AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTED;
        }
      }
    }),
    (AdapterJS.WebRTCPlugin.isPluginInstalled = function(
      comName,
      plugName,
      plugType,
      installedCb,
      notInstalledCb
    ) {
      if ("IE" !== AdapterJS.webrtcDetectedBrowser) {
        var pluginArray = navigator.mimeTypes;
        if (void 0 !== pluginArray) {
          for (var i = 0; i < pluginArray.length; i++)
            if (pluginArray[i].type.indexOf(plugType) >= 0)
              return void installedCb();
          notInstalledCb();
        } else
          AdapterJS.renderNotificationBar(AdapterJS.TEXT.PLUGIN.NOT_SUPPORTED);
      } else {
        try {
          new ActiveXObject(comName + "." + plugName);
        } catch (e) {
          return void notInstalledCb();
        }
        installedCb();
      }
    }),
    (AdapterJS.WebRTCPlugin.defineWebRTCInterface = function() {
      if (
        AdapterJS.WebRTCPlugin.pluginState !==
        AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY
      ) {
        (AdapterJS.WebRTCPlugin.pluginState =
          AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING),
          (AdapterJS.isDefined = function(variable) {
            return null !== variable && void 0 !== variable;
          }),
          (RTCSessionDescription = function(info) {
            return (
              AdapterJS.WebRTCPlugin.WaitForPluginReady(),
              AdapterJS.WebRTCPlugin.plugin.ConstructSessionDescription(
                info.type,
                info.sdp
              )
            );
          }),
          (MediaStream = function(mediaStreamOrTracks) {
            return (
              AdapterJS.WebRTCPlugin.WaitForPluginReady(),
              AdapterJS.WebRTCPlugin.plugin.MediaStream(mediaStreamOrTracks)
            );
          }),
          (RTCPeerConnection = function(servers, constraints) {
            if (
              void 0 !== servers &&
              null !== servers &&
              !Array.isArray(servers.iceServers)
            )
              throw new Error(
                "Failed to construct 'RTCPeerConnection': Malformed RTCConfiguration"
              );
            if (void 0 !== constraints && null !== constraints) {
              var invalidConstraits = !1;
              if (
                ((invalidConstraits |= "object" != typeof constraints),
                (invalidConstraits |=
                  constraints.hasOwnProperty("mandatory") &&
                  void 0 !== constraints.mandatory &&
                  null !== constraints.mandatory &&
                  constraints.mandatory.constructor !== Object),
                (invalidConstraits |=
                  constraints.hasOwnProperty("optional") &&
                  void 0 !== constraints.optional &&
                  null !== constraints.optional &&
                  !Array.isArray(constraints.optional)))
              )
                throw new Error(
                  "Failed to construct 'RTCPeerConnection': Malformed constraints object"
                );
            }
            AdapterJS.WebRTCPlugin.WaitForPluginReady();
            var iceServers = null;
            if (servers && Array.isArray(servers.iceServers)) {
              iceServers = servers.iceServers;
              for (var i = 0; i < iceServers.length; i++)
                iceServers[i].urls &&
                  !iceServers[i].url &&
                  (iceServers[i].url = iceServers[i].urls),
                  (iceServers[i].hasCredentials =
                    AdapterJS.isDefined(iceServers[i].username) &&
                    AdapterJS.isDefined(iceServers[i].credential));
            }
            if (
              AdapterJS.WebRTCPlugin.plugin.PEER_CONNECTION_VERSION &&
              AdapterJS.WebRTCPlugin.plugin.PEER_CONNECTION_VERSION > 1
            )
              return (
                iceServers && (servers.iceServers = iceServers),
                AdapterJS.WebRTCPlugin.plugin.PeerConnection(servers)
              );
            var mandatory =
                constraints && constraints.mandatory
                  ? constraints.mandatory
                  : null,
              optional =
                constraints && constraints.optional
                  ? constraints.optional
                  : null;
            return AdapterJS.WebRTCPlugin.plugin.PeerConnection(
              AdapterJS.WebRTCPlugin.pageId,
              iceServers,
              mandatory,
              optional
            );
          });
        var MediaStreamTrack = function() {};
        MediaStreamTrack.getSources = function(callback) {
          AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
            AdapterJS.WebRTCPlugin.plugin.GetSources(callback);
          });
        };
        var constraintsToPlugin = function(c) {
          if ("object" != typeof c || c.mandatory || c.optional) return c;
          var cc = {};
          return (
            Object.keys(c).forEach(function(key) {
              if ("require" !== key && "advanced" !== key) {
                if ("string" == typeof c[key]) return void (cc[key] = c[key]);
                var r = "object" == typeof c[key] ? c[key] : { ideal: c[key] };
                void 0 !== r.exact &&
                  "number" == typeof r.exact &&
                  (r.min = r.max = r.exact);
                var oldname = function(prefix, name) {
                  return prefix
                    ? prefix + name.charAt(0).toUpperCase() + name.slice(1)
                    : "deviceId" === name
                    ? "sourceId"
                    : name;
                };
                if (
                  ("sourceId" === oldname("", key) &&
                    void 0 !== r.exact &&
                    ((r.ideal = r.exact), (r.exact = void 0)),
                  void 0 !== r.ideal)
                ) {
                  cc.optional = cc.optional || [];
                  var oc = {};
                  "number" == typeof r.ideal
                    ? ((oc[oldname("min", key)] = r.ideal),
                      cc.optional.push(oc),
                      (oc = {}),
                      (oc[oldname("max", key)] = r.ideal),
                      cc.optional.push(oc))
                    : ((oc[oldname("", key)] = r.ideal), cc.optional.push(oc));
                }
                void 0 !== r.exact && "number" != typeof r.exact
                  ? ((cc.mandatory = cc.mandatory || {}),
                    (cc.mandatory[oldname("", key)] = r.exact))
                  : ["min", "max"].forEach(function(mix) {
                      void 0 !== r[mix] &&
                        ((cc.mandatory = cc.mandatory || {}),
                        (cc.mandatory[oldname(mix, key)] = r[mix]));
                    });
              }
            }),
            c.advanced &&
              (cc.optional = (cc.optional || []).concat(c.advanced)),
            cc
          );
        };
        (getUserMedia = function(
          constraints,
          successCallback,
          failureCallback
        ) {
          var cc = {};
          (cc.audio =
            !!constraints.audio && constraintsToPlugin(constraints.audio)),
            (cc.video =
              !!constraints.video && constraintsToPlugin(constraints.video)),
            AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
              AdapterJS.WebRTCPlugin.plugin.getUserMedia(
                cc,
                successCallback,
                failureCallback
              );
            });
        }),
          (window.navigator.getUserMedia = getUserMedia),
          "undefined" != typeof Promise &&
            ((requestUserMedia = function(constraints) {
              return new Promise(function(resolve, reject) {
                try {
                  getUserMedia(constraints, resolve, reject);
                } catch (error) {
                  reject(error);
                }
              });
            }),
            void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}),
            (navigator.mediaDevices.getUserMedia = requestUserMedia),
            (navigator.mediaDevices.enumerateDevices = function() {
              return new Promise(function(resolve) {
                var kinds = { audio: "audioinput", video: "videoinput" };
                return MediaStreamTrack.getSources(function(devices) {
                  resolve(
                    devices.map(function(device) {
                      return {
                        label: device.label,
                        kind: kinds[device.kind],
                        id: device.id,
                        deviceId: device.id,
                        groupId: ""
                      };
                    })
                  );
                });
              });
            })),
          (attachMediaStream = function(element, stream) {
            if (element && element.parentNode) {
              var streamId;
              null === stream
                ? (streamId = "")
                : (void 0 !== stream.enableSoundTracks &&
                    stream.enableSoundTracks(!0),
                  (streamId = stream.id));
              var elementId =
                  0 === element.id.length
                    ? Math.random()
                        .toString(36)
                        .slice(2)
                    : element.id,
                nodeName = element.nodeName.toLowerCase();
              if ("object" !== nodeName) {
                var tag;
                switch (nodeName) {
                  case "audio":
                    tag = AdapterJS.WebRTCPlugin.TAGS.AUDIO;
                    break;
                  case "video":
                    tag = AdapterJS.WebRTCPlugin.TAGS.VIDEO;
                    break;
                  default:
                    tag = AdapterJS.WebRTCPlugin.TAGS.NONE;
                }
                var frag = document.createDocumentFragment(),
                  temp = document.createElement("div"),
                  classHTML = "";
                for (
                  element.className
                    ? (classHTML = 'class="' + element.className + '" ')
                    : element.attributes &&
                      element.attributes.class &&
                      (classHTML =
                        'class="' + element.attributes.class.value + '" '),
                    temp.innerHTML =
                      '<object id="' +
                      elementId +
                      '" ' +
                      classHTML +
                      'type="' +
                      AdapterJS.WebRTCPlugin.pluginInfo.type +
                      '"><param name="pluginId" value="' +
                      elementId +
                      '" /> <param name="pageId" value="' +
                      AdapterJS.WebRTCPlugin.pageId +
                      '" /> <param name="windowless" value="true" /> <param name="streamId" value="' +
                      streamId +
                      '" /> <param name="tag" value="' +
                      tag +
                      '" /> </object>';
                  temp.firstChild;

                )
                  frag.appendChild(temp.firstChild);
                var height = "",
                  width = "";
                element.clientWidth || element.clientHeight
                  ? ((width = element.clientWidth),
                    (height = element.clientHeight))
                  : (element.width || element.height) &&
                    ((width = element.width), (height = element.height)),
                  element.parentNode.insertBefore(frag, element),
                  (frag = document.getElementById(elementId)),
                  (frag.width = width),
                  (frag.height = height),
                  element.parentNode.removeChild(element);
              } else {
                for (
                  var children = element.children, i = 0;
                  i !== children.length;
                  ++i
                )
                  if ("streamId" === children[i].name) {
                    children[i].value = streamId;
                    break;
                  }
                element.setStreamId(streamId);
              }
              var newElement = document.getElementById(elementId);
              return (
                AdapterJS.forwardEventHandlers(
                  newElement,
                  element,
                  Object.getPrototypeOf(element)
                ),
                newElement
              );
            }
          }),
          (reattachMediaStream = function(to, from) {
            for (
              var stream = null, children = from.children, i = 0;
              i !== children.length;
              ++i
            )
              if ("streamId" === children[i].name) {
                AdapterJS.WebRTCPlugin.WaitForPluginReady(),
                  (stream = AdapterJS.WebRTCPlugin.plugin.getStreamWithId(
                    AdapterJS.WebRTCPlugin.pageId,
                    children[i].value
                  ));
                break;
              }
            if (null !== stream) return attachMediaStream(to, stream);
          }),
          (window.attachMediaStream = attachMediaStream),
          (window.reattachMediaStream = reattachMediaStream),
          (window.getUserMedia = getUserMedia),
          (AdapterJS.attachMediaStream = attachMediaStream),
          (AdapterJS.reattachMediaStream = reattachMediaStream),
          (AdapterJS.getUserMedia = getUserMedia),
          (AdapterJS.forwardEventHandlers = function(
            destElem,
            srcElem,
            prototype
          ) {
            var properties = Object.getOwnPropertyNames(prototype);
            for (var prop in properties)
              if (prop) {
                var propName = properties[prop];
                "function" == typeof propName.slice &&
                  "on" === propName.slice(0, 2) &&
                  "function" == typeof srcElem[propName] &&
                  AdapterJS.addEvent(
                    destElem,
                    propName.slice(2),
                    srcElem[propName]
                  );
              }
            var subPrototype = Object.getPrototypeOf(prototype);
            subPrototype &&
              AdapterJS.forwardEventHandlers(destElem, srcElem, subPrototype);
          }),
          (RTCIceCandidate = function(candidate) {
            return (
              candidate.sdpMid || (candidate.sdpMid = ""),
              AdapterJS.WebRTCPlugin.WaitForPluginReady(),
              AdapterJS.WebRTCPlugin.plugin.ConstructIceCandidate(
                candidate.sdpMid,
                candidate.sdpMLineIndex,
                candidate.candidate
              )
            );
          }),
          AdapterJS.addEvent(
            document,
            "readystatechange",
            AdapterJS.WebRTCPlugin.injectPlugin
          ),
          AdapterJS.WebRTCPlugin.injectPlugin();
      }
    }),
    (AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb =
      AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb ||
      function() {
        AdapterJS.addEvent(
          document,
          "readystatechange",
          AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv
        ),
          AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv();
      }),
    (AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv = function() {
      if (
        AdapterJS.documentReady() &&
        (document.removeEventListener(
          "readystatechange",
          AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv
        ),
        !AdapterJS.options.hidePluginInstallPrompt)
      ) {
        var downloadLink = AdapterJS.WebRTCPlugin.pluginInfo.downloadLink;
        if (downloadLink) {
          var popupString;
          AdapterJS.WebRTCPlugin.pluginInfo.companyName
            ? ((popupString = "This website requires you to install the "),
              AdapterJS.WebRTCPlugin.pluginInfo.portalLink
                ? (popupString +=
                    ' <a href="' +
                    AdapterJS.WebRTCPlugin.pluginInfo.portalLink +
                    '" target="_blank">' +
                    AdapterJS.WebRTCPlugin.pluginInfo.companyName +
                    " WebRTC Plugin</a>")
                : (popupString +=
                    AdapterJS.WebRTCPlugin.pluginInfo.companyName +
                    " WebRTC Plugin"),
              (popupString += " to work on this browser."))
            : (popupString = AdapterJS.TEXT.PLUGIN.REQUIRE_INSTALLATION),
            AdapterJS.renderNotificationBar(
              popupString,
              AdapterJS.TEXT.PLUGIN.BUTTON,
              function() {
                if (
                  (window.open(downloadLink, "_top"),
                  "safari" === webrtcDetectedBrowser &&
                    11 == webrtcDetectedVersion)
                )
                  AdapterJS.renderNotificationBar(
                    AdapterJS.TEXT.PLUGIN.REQUIRE_RESTART
                  );
                else
                  var pluginInstallInterval = setInterval(function() {
                    "IE" !== AdapterJS.webrtcDetectedBrowser &&
                      navigator.plugins.refresh(!1),
                      AdapterJS.WebRTCPlugin.isPluginInstalled(
                        AdapterJS.WebRTCPlugin.pluginInfo.prefix,
                        AdapterJS.WebRTCPlugin.pluginInfo.plugName,
                        AdapterJS.WebRTCPlugin.pluginInfo.type,
                        function() {
                          clearInterval(pluginInstallInterval),
                            AdapterJS.WebRTCPlugin.defineWebRTCInterface();
                        },
                        function() {}
                      );
                  }, 500);
              }
            );
        } else
          AdapterJS.renderNotificationBar(AdapterJS.TEXT.PLUGIN.NOT_SUPPORTED);
      }
    }),
    AdapterJS.WebRTCPlugin.isPluginInstalled(
      AdapterJS.WebRTCPlugin.pluginInfo.prefix,
      AdapterJS.WebRTCPlugin.pluginInfo.plugName,
      AdapterJS.WebRTCPlugin.pluginInfo.type,
      AdapterJS.WebRTCPlugin.defineWebRTCInterface,
      AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb
    );
"undefined" != typeof exports && (module.exports = AdapterJS);
