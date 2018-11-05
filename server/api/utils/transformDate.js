export default function(date) {
  if (date && !isNaN(new Date(date).getTime())) {
    return new Date(date)
  }
}
