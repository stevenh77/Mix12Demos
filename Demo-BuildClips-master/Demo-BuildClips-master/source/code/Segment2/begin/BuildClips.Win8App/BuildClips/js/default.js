﻿// For an introduction to the Grid template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
                WinJS.Utilities.startLog({ type: "error", tags: "BuildClips" });
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                var messagesElement = document.getElementById('messages');
                var messagesHistoryElement = document.getElementById('messagesHistory');

                Data.messagesElement = messagesElement;
                Data.messagesHistoryElement = document.getElementById('messagesHistoryContainer');
                Data.profilingTemplateElement = document.getElementById('profilingTemplate');

                messagesHistoryElement.winControl.anchor = messagesElement;
                messagesHistoryElement.winControl.placement = 'bottom';
                messagesHistoryElement.winControl.alignment = 'center';

                Data.tracingTemplateElement = document.getElementById('tracingTemplate');

                messagesElement.addEventListener('click', function () {
                    messagesHistoryElement.winControl.show();
                });

                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    WinJS.Application.onsettings = function (e) {
        e.detail.applicationcommands = { "profilingFlyout": { title: "Profiling", href: "/profilingSettings.html" } };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    };

    app.start();
})();
