(function ($) {

    var a = "<div class='simple-tags-block'> <input type='text' class='simple-tag-input' placeholder='add tags'> </div>";

    $.fn.tags = function (opts) {
        var $this = $(this);
        $this.css('display', 'none');
        $(a).insertAfter(this); // create our own div
        $input = $this.siblings().find('.simple-tag-input')
        $input.keydown( function (event) {
            if (event.which == 13 || event.which == 9) {
                event.preventDefault();
                if ($(event.target).val() !== '') {
                    if ($this.val().length > 0) {
                        var val = $this.val()
                          , values = val.split(',');

                        values[values.length] = $(event.target).val();
                        $this.val(values.join(','));
                    } else {
                        $this.val($(event.target).val());
                    }
                    createTag(event, $input);
                }
            }
        });
    };

    function createTag (event, $input) {

        var $element = $(event.target)
          , el = "<span class='simple-tag'>" + $element.val() + "</span>";

        $(el).insertBefore($input);
        $input.val('');
    }

})(jQuery);