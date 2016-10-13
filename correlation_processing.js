self.onmessage = function(event)
{
	var timeseries = event.data.timeseries;
	var testFrequencies = event.data.testFrequencies;
	var sampleRate = event.data.sampleRate;
	var amplitudes = compute_correlations(timeseries, testFrequencies, sampleRate);
	self.postMessage({ "timeseries": timeseries, "frequency_amplitudes": amplitudes });
};

/*
 * Rather than computing correlations with sin or cos, a complex exponential (e^ix = cos(x) + isin(x))
 * is used to find the correlations even if the waveform is out of phase with a pure sin or cos wave.
*/
function findAmplitudeCorrelation(timeseries, testFrequencies, sampleRate) {
	/*
   * The 2pi * frequency gives the appropriate period to sine while the
	 * timeseries index / sampleRate gives the appropriate time coordinate.
  */
  var scaleFactor = 2 * Math.PI / sampleRate;
	var amplitudes = testFrequencies.map( function(f) {
			var frequency = f.frequency;

			// Represent a complex number as a length-2 array [ real, imaginary ].
			var accumulator = [ 0, 0 ];
			for (var t = 0; t < timeseries.length; t++)
			{
				accumulator[0] += timeseries[t] * Math.cos(scaleFactor * frequency * t);
				accumulator[1] += timeseries[t] * Math.sin(scaleFactor * frequency * t);
			}

			return accumulator;
		}
	);

	return amplitudes;
}
