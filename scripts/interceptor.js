export class EventsInterceptor {
  static pointXY(area, event) {
    let pointX = Math.floor(
      (area.offsetLeft + area.offsetWidth) / 2 -
        (event.touches.length
          ? event.touches[0].clientX
          : event.changedTouches[0].clientX)
    );
    let pointY = Math.floor(
      (area.offsetTop + area.offsetHeight) / 2 -
        (event.touches.length
          ? event.touches[0].clientY
          : event.changedTouches[0].clientY)
    );
    return { pointX, pointY };
  }
}
