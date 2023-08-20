(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});





			var resizeTimeout;

			$window.on('resize', function() {
					$body.addClass('is-resizing');
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');
						$img.css('opacity', '0');
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

						event.preventDefault();
						event.stopPropagation();




						$sidebar.toggleClass('inactive');

				});

				$sidebar.on('click', 'a', function(event) {

						if (breakpoints.active('>large'))
							return;
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');
						event.preventDefault();
						event.stopPropagation();
						//url check krne ku
						if (!href || href == '#' || href == '')
							return;

					// sidebar hide karne ku
						$sidebar.addClass('inactive');
					// href pe jaane ku
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);
				});
				$sidebar.on('click touchend touchstart touchmove', function(event) {

						if (breakpoints.active('>large'))
							return;
					// propagation nikalne ku
						event.stopPropagation();
				});

				$body.on('click touchend', function(event) {

						if (breakpoints.active('>large'))
							return;

					// Deactivate karne ku
						$sidebar.addClass('inactive');

				});

			$window.on('load.sidebar-lock', function() {
				var sh, wh, st;
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// positions calculate karne ko
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock ya unlock karne ko
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// heights k liye
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {
						event.preventDefault();
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

})(jQuery);