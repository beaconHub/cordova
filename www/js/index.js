/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');

        console.log("device ready!");

        $(function() {
            $('#touch').on('click', function () {
                alert('you touched!');
            });

            window.logToDom = function (message) {
//                    var e = document.createElement('label');
//                    e.innerText = message;
//
//                    var br = document.createElement('br');
//                    var br2 = document.createElement('br');
                var log = $('#log');
                //log.append(e);
                //log.append(br);
                //log.append(br2);
                log.text(message + '\n' + log.text());

                //window.scrollTo(0, window.document.height);
            };
        });

        $(function() {

            var delegate = new cordova.plugins.locationManager.Delegate().implement({

                // A sample of startRangingBeaconsInRegion
                //2014-08-16 22:24:03.186 BeaconHunter[480:5003] [DOM] _onDelegateCallback() {"eventType":"didRangeBeaconsInRegion","beacons":[{"major":0,"minor":0,"uuid":"E2C56DB5-DFFB-48D2-B060-D0F5A71096E0","accuracy":0.17,"rssi":-52,"proximity":"ProximityImmediate"}],"region":{"major":0,"minor":0,"uuid":"E2C56DB5-DFFB-48D2-B060-D0F5A71096E0","identifier":"AirLocate Trial Beacon from Harry","typeName":"BeaconRegion"}}
                // A sample of startMonitoringForRegion
                // 2014-08-16 22:26:45.614 BeaconHunter[492:6307] [DOM] [DOM] didDetermineStateForRegion: {"eventType":"didDetermineStateForRegion","state":"CLRegionStateInside","region":{"identifier":"AirLocate Trial Beacon from Harry","uuid":"E2C56DB5-DFFB-48D2-B060-D0F5A71096E0","major":0,"minor":0,"typeName":"BeaconRegion"}}
                //
                // Summary:
                //    * "Range" detects more frequently than "Monitor"
                //    * "Range" gives accuracy and power parameter

                didRangeBeaconsInRegion: function (pluginResult) {
                    if (pluginResult['beacons'].length > 0){
                        $('#status').text('IN');
                        $('#accuracy').text(pluginResult['beacons'][0]['accuracy']);
                        $('#rssi').text(pluginResult['beacons'][0]['rssi']);
                    } else {
                        $('#status').text('OUT');
                    };

                    console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

                    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                        + JSON.stringify(pluginResult));
                },

                didDetermineStateForRegion: function (pluginResult) {
                    if (pluginResult['state'] === 'CLRegionStateInside'){
                        $('#status').text('IN');
                    } else if (pluginResult['state'] === 'CLRegionStateOutside'){
                        $('#status').text('OUT');
                    } else {
                        $('#status').text('UNKNOWN:"' + pluginResult['state'] + '"');
                    };

                    console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

                    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                        + JSON.stringify(pluginResult));
                },

                didStartMonitoringForRegion: function (pluginResult) {
                    console.log('didStartMonitoringForRegion:', pluginResult);
                    console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
                },
            });

            console.log('Executed here, ready to find iBeacon!');

            //var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
            //var identifier = '8/F Batman Classroom';
            //var major = 8;
            //var minor = 31664;
            var uuid = 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0';
            var identifier = 'AirLocate Trial Beacon from Harry';
            var major = 0;
            var minor = 0;
            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

            cordova.plugins.locationManager.setDelegate(delegate);
//                    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
                .fail(console.error)
                .done();
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};
