// Generated by CoffeeScript 1.4.0
(function() {

  $(window).load(function() {
    var TooltipRotator;
    TooltipRotator = (function() {

      TooltipRotator.prototype.itemInterval = 5000;

      TooltipRotator.prototype.numberOfItems = $('.row').length;

      TooltipRotator.prototype.currentItem = 0;

      function TooltipRotator() {
        this.showTooltip();
        this.beginLoop();
        this.watchForClick();
      }

      TooltipRotator.prototype.showTooltip = function() {
        var dataRole;
        $('.row').eq(this.currentItem).addClass('active');
        dataRole = $('.row').eq(this.currentItem).attr('data-role');
        $('.tooltip.' + dataRole).removeClass('hide').addClass('show');
        return this.positionTooltip($('.tooltip' + '.' + dataRole));
      };

      TooltipRotator.prototype.hideTooltip = function() {
        $('.row.active').removeClass('active');
        return $('.tooltip.show').removeClass('show').addClass('hide');
      };

      TooltipRotator.prototype.beginLoop = function() {
        var _this = this;
        return this.infiniteLoop = setInterval(function() {
          return _this.changeTooltip();
        }, this.itemInterval);
      };

      TooltipRotator.prototype.restartLoop = function() {
        clearInterval(this.infiniteLoop);
        return this.beginLoop();
      };

      TooltipRotator.prototype.watchForClick = function() {
        var _this = this;
        return $('#browser-container').on('click tapone', '.row', function(e) {
          var dataRole, target;
          target = e.currentTarget;
          _this.currentItem = $(target).index();
          if (!$(target).hasClass('active')) {
            _this.hideTooltip();
            dataRole = $(target).attr('data-role');
            $(target).addClass('active');
            $('.tooltip' + '.' + dataRole).removeClass('hide').addClass('show');
            _this.positionTooltip($('.tooltip' + '.' + dataRole));
          }
          return _this.restartLoop();
        });
      };

      TooltipRotator.prototype.changeTooltip = function() {
        this.hideTooltip();
        if (this.currentItem === this.numberOfItems - 1) {
          this.currentItem = 0;
        } else {
          this.currentItem++;
        }
        return this.showTooltip();
      };

      TooltipRotator.prototype.positionTooltip = function(el) {
        var containerWidth, posTooltipX, posTooltipY, tooltipWidth, viewportWidth;
        viewportWidth = $(window).width();
        containerWidth = $('#browser-container').innerWidth();
        tooltipWidth = $(el).innerWidth();
        (posTooltipX = function() {
          var containerMargins, newPosition, setNewPosition, tooltipLeft, tooltipOffScreen, tooltipRight, tooltipSpace;
          tooltipLeft = $(el).offset().left;
          tooltipRight = viewportWidth - (tooltipLeft + tooltipWidth);
          containerMargins = (viewportWidth - containerWidth) / 2;
          tooltipSpace = containerMargins + containerWidth;
          newPosition = tooltipSpace - (tooltipWidth + 15);
          setNewPosition = $(el).css('left', newPosition);
          tooltipOffScreen = (tooltipWidth + tooltipLeft) >= (viewportWidth - 20);
          if (tooltipOffScreen) {
            setNewPosition;

          } else {
            $(el).css('left', '60%');
          }
          if (tooltipWidth >= containerWidth) {
            return $(el).css('width', containerWidth - 15);
          }
        })();
        return (posTooltipY = function() {
          var centerPos, ipadPortrait, iphonlandscape, posTooltipBottom, rowPos, tooltipHasRoom, tooltipHeight;
          ipadPortrait = (viewportWidth <= 768) && (viewportWidth > 640);
          iphonlandscape = viewportWidth <= 640;
          tooltipHasRoom = tooltipWidth < containerWidth;
          rowPos = $('.row.active').position().top;
          tooltipHeight = $(el).innerHeight();
          posTooltipBottom = function() {
            return $(el).css('top', rowPos + 21);
          };
          if (tooltipHasRoom) {
            centerPos = rowPos - (tooltipHeight / 2) + 6;
            $(el).css('top', centerPos);
          }
          if (ipadPortrait) {
            if (tooltipWidth > (containerWidth * 0.75)) {
              $(el).addClass('pos-under');
              posTooltipBottom();
            }
          } else if (iphonlandscape) {
            posTooltipBottom();
          }
          if (!ipadPortrait) {
            return $(el).removeClass('pos-under');
          }
        })();
      };

      return TooltipRotator;

    })();
    return new TooltipRotator();
  });

}).call(this);