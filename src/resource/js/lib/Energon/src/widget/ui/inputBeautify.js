; (function ($) {
    $.fn.inputBeautify = function (options) {
        options = options || {};
        var defaultOpt = {
            checkboxCls: options.checkboxCls || 'ez-checkbox',
            radioCls: options.radioCls || 'ez-radio',
            disCheckboxCls: options.disCheckboxCls || 'ez-checkbox-disable',
            disRadioCls: options.disRadioCls || 'ez-radio-disable',
            selectedCheckboxCls: options.selectedCheckboxCls || 'ez-checkbox-selected',
            selectedRadioCls: options.selectedRadioCls || 'ez-radio-selected',
            hideCls: 'ez-hide'
        };
        return this.each(function () {
            var that = $(this),parent = $(this).parent();
            if (that.attr('type') == 'checkbox') {
                that.addClass(defaultOpt.hideCls).change(function () {
                    if ($(this).prop('checked')) {
                        $(this).parent().addClass(defaultOpt.selectedCheckboxCls);
                    } else {
                        $(this).parent().removeClass(defaultOpt.selectedCheckboxCls).addClass(defaultOpt.checkboxCls);
                    }
                    if($(this).prop('disabled')){
                        $(this).parent().addClass(defaultOpt.disCheckboxCls);
                    }
                });
            } else if (that.attr('type') == 'radio') {
                that.addClass(defaultOpt.hideCls).change(function () {
                    $('input[name="' + $(this).attr('name') + '"]').each(function () {
                        if ($(this).prop('checked')) {
                            $(this).parent().addClass(defaultOpt.selectedRadioCls);
                        } else {
                            $(this).parent().removeClass(defaultOpt.selectedRadioCls).addClass(defaultOpt.radioCls);
                        }
                        if($(this).prop('disabled')) {
                            $(this).parent().addClass(defaultOpt.disRadioCls);
                        }
                    });
                });
            }
            that.trigger('change');
        });
    }
})(jQuery);