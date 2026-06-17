/**
 * Captures the exact position, size and center of a DOM element
 * relative to the viewport. Used to start reveal animations from
 * the card's true grid position.
 */
export function captureRect(el) {
  const r = el.getBoundingClientRect();
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
    centerX: r.left + r.width / 2,
    centerY: r.top + r.height / 2
  };
}

/**
 * Returns the center of the viewport.
 */
export function viewportCenter() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
}

/**
 * Computes the translate offsets needed to move an element from
 * its current position to the viewport center.
 */
export function offsetToCenter(rect) {
  const vc = viewportCenter();
  return {
    dx: vc.x - rect.centerX,
    dy: vc.y - rect.centerY
  };
}

/**
 * Returns an array of { el, dx, dy } for each neighbor card,
 * where the shift direction is away from the selected card.
 */
export function computeNeighborShifts(cards, selectedIndex, maxShift) {
  const gridCols = 3;
  const selRow = Math.floor(selectedIndex / gridCols);
  const selCol = selectedIndex % gridCols;

  return cards.map((el, i) => {
    if (i === selectedIndex) return null;
    const row = Math.floor(i / gridCols);
    const col = i % gridCols;
    const dr = row - selRow;
    const dc = col - selCol;
    const dist = Math.sqrt(dr * dr + dc * dc);
    if (dist === 0) return null;
    const factor = Math.max(0, 1 - (dist - 1) * 0.35);
    const len = Math.sqrt(dr * dr + dc * dc);
    return {
      el,
      dx: (dc / len) * maxShift * factor,
      dy: (dr / len) * maxShift * factor,
      rot: (dc - dr) * 0.4 * factor
    };
  }).filter(Boolean);
}
