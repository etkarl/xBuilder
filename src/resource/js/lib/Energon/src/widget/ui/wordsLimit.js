;(function ($) {
    $.fn.wordsLimit = function () {
        return this.each(function () {
            var _this = $(this),
            options = {
                limitWords: _this.attr('data-limit-words') || 60,
                chars: (_this.attr('data-chars')==1) ? 1 : 2
            },
            setRestWords = function () {
                var str = _this.val().replace(/\s/g, ''),
                    len= (options.chars==1) ? str.length : str.replace(/[^\x00-\xff]/g, "**").length,
                    words = Math.abs(Math.floor((options.limitWords * options.chars - len)/options.chars)),
                    o = _this.next('.e-limit').find('.e-limit-rest');
                if (len > options.limitWords * options.chars) {
                    o.html('<span style="color:#ff3334">' + words + '</span>');
                }
                else {
                    o.html('<span class="color:#999">' + words + '</span>');
                }
            };
            var template = '<span class="e-limit" style="position:relative;top:-14px;font-family:Georgia;font-size:26px;color:#999;padding:5px">' +
                            '<span class="e-limit-rest"></span>/' + options.limitWords +
                            '</span>';
            _this.after(template);
            _this.bind('mousedown keyup', function () {
                setRestWords();
            });
            setRestWords();
        });
    }
})(jQuery);