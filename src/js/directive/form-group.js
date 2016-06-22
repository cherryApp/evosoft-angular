// <form-group></form-group>
evosoft.directive('formGroup', [function(){
    return {
        restrict: 'AE',
        template: `
        <div class="form-group">
            <label data-ng-bind="label"></label>
            <input type="text" name="{{inputName}}" data-ng-model="model" class="form-control">
            <div data-ng-show="error" class="input-error">{{error}}</div>
        </div>`,
        scope: {
            label: '@label',
            model: '=model',
            inputName: '=inputName',
            error: '=error'
        }
    };
}]);