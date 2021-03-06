// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service for the 'embed exploration' modal.
 */

require(
  'components/button-directives/' +
  'exploration-embed-button-modal.controller.ts');

require('domain/utilities/url-interpolation.service.ts');
require('services/site-analytics.service.ts');

angular.module('oppia').factory('ExplorationEmbedButtonService', [
  '$uibModal', 'SiteAnalyticsService', 'UrlInterpolationService',
  function($uibModal, SiteAnalyticsService, UrlInterpolationService) {
    return {
      showModal: function(explorationId) {
        $uibModal.open({
          backdrop: true,
          templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
            '/components/button-directives/' +
            'exploration-embed-button.directive.html'),
          resolve: {
            explorationId: function() {
              return explorationId;
            }
          },
          controller: 'ExplorationEmbedButtonModalController'
        }).result.then(function() {}, function() {
          // Note to developers:
          // This callback is triggered when the Cancel button is clicked.
          // No further action is needed.
        });

        SiteAnalyticsService.registerOpenEmbedInfoEvent(explorationId);
      }
    };
  }
]);
