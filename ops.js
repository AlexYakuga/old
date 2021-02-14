const sections = $('section');
const display = $('.maincontent');
const sidemenu = $('.fixed-menu');
const menuItems = sidemenu.find('.fixed-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent)
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error('передано неверное значение в countSectionPosition');
    return 0;
  }

  return position;
};

const changeMenuTheemeForSection = sectionsEq => {
  const currentSection = sections.eq(sectionsEq);
  const menuTheme = currentSection.attr('data-sidemenu-theme');
  const activeClass = 'fixed-menu--shadowed';

  if (menuTheme == 'black') {
    sidemenu.addClass(activeClass);
  } else {
    sidemenu.removeClass('fixed-menu--shadowed');
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;
  const position = countSectionPosition(sectionEq);

  changeMenuTheemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionEq, 'active');

  setTimeout(() => {
    inScroll = false
    resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--active')
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = () => {
  const activeSection = sections.filter('.active')
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};


$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {  //next
    scroller.next();
  }

  if (deltaY < 0) {  //prev
    scroller.prev();
  }
})

$(window).on('keydown', (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInputs = tagName == 'input' || tagName == 'textarea';
  const scroller = viewportScroller();

  if (userTypingInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller.prev();
      break;

    case 40:
      scroller.next();
      break;
  }
});

$('wrapper').on('touchmove', e => e.preventDefult());

$('[data-scroll-to]').click(e => {
  e.preventDefult();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
})

if (isMobile) {
  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = '';

      if (direction == up) crollDirection = "next";
      if (direction == down) crollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
}