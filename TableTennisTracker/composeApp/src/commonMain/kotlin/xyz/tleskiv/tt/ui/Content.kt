package xyz.tleskiv.tt.ui

import androidx.compose.animation.ExperimentalSharedTransitionApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlin.random.Random

@Composable
fun ContentA(onNext: () -> Unit) = ContentBase(
	title = "Content A Title",
	modifier = Modifier.background(PastelRed),
	onNext = onNext,
) {
	Text(
		modifier =
			Modifier.padding(16.dp),
		text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend dui non orci eleifend bibendum. Nulla varius ultricies dolor sit amet semper. Sed accumsan, dolor id finibus rhoncus, nisi nibh suscipit augue, vitae gravida dui justo et ex. Maecenas eget suscipit lacus. Mauris ac rhoncus lacus. Suspendisse placerat eleifend magna at ornare. Duis efficitur euismod felis, vel porttitor eros hendrerit nec."
	)
}

@Composable
fun ContentB() = ContentBase(
	title = "Content B Title",
	modifier = Modifier.background(PastelGreen)
) {
	Text(
		modifier =
			Modifier.padding(16.dp),
		text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend dui non orci eleifend bibendum. Nulla varius ultricies dolor sit amet semper. Sed accumsan, dolor id finibus rhoncus, nisi nibh suscipit augue, vitae gravida dui justo et ex. Maecenas eget suscipit lacus. Mauris ac rhoncus lacus. Suspendisse placerat eleifend magna at ornare. Duis efficitur euismod felis, vel porttitor eros hendrerit nec."
	)
}

@Composable
fun SampleContent(title: String, backgroundColor: Color, onNext: (() -> Unit)? = null) =
	ContentBase(
		title = title,
		modifier = Modifier.background(backgroundColor),
		onNext = onNext,
	) {
		Text(
			modifier =
				Modifier.padding(16.dp),
			text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend dui non orci eleifend bibendum. Nulla varius ultricies dolor sit amet semper. Sed accumsan, dolor id finibus rhoncus, nisi nibh suscipit augue, vitae gravida dui justo et ex. Maecenas eget suscipit lacus. Mauris ac rhoncus lacus. Suspendisse placerat eleifend magna at ornare. Duis efficitur euismod felis, vel porttitor eros hendrerit nec."
		)
	}


@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun ContentBase(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) {
	Column(
		horizontalAlignment = Alignment.CenterHorizontally,
		modifier = modifier
			.fillMaxSize()
			.safeDrawingPadding()
			.clip(RoundedCornerShape(48.dp))
	) {
		Title(title)
		if (content != null) content()
		if (onNext != null) {
			Button(
				modifier = Modifier.align(Alignment.CenterHorizontally),
				onClick = onNext
			) {
				Text("Next")
			}
		}
	}
}

@Composable
fun ColumnScope.Title(title: String) {
	Text(
		modifier = Modifier
			.padding(24.dp)
			.align(Alignment.CenterHorizontally),
		fontWeight = FontWeight.Bold,
		text = title
	)
}

@Composable
fun Count(name: String) {
	var count: Int by rememberSaveable { mutableIntStateOf(0) }
	Column {
		Text("Count $name is $count")
		Button(onClick = { count++ }) {
			Text("Increment")
		}
	}
}


@Composable
fun ContentRed(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelRed),
	onNext = onNext,
	content = content
)

@Composable
fun ContentOrange(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelOrange),
	onNext = onNext,
	content = content
)

@Composable
fun ContentYellow(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelYellow),
	onNext = onNext,
	content = content
)

@Composable
fun ContentGreen(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelGreen),
	onNext = onNext,
	content = content
)

@Composable
fun ContentBlue(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelBlue),
	onNext = onNext,
	content = content
)

@Composable
fun ContentMauve(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelMauve),
	onNext = onNext,
	content = content
)

@Composable
fun ContentPurple(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelPurple),
	onNext = onNext,
	content = content
)

@Composable
fun ContentPink(
	title: String,
	modifier: Modifier = Modifier,
	onNext: (() -> Unit)? = null,
	content: (@Composable () -> Unit)? = null,
) = ContentBase(
	title = title,
	modifier = modifier.background(PastelPink),
	onNext = onNext,
	content = content
)

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

val PastelRed = Color(0xFFFFADAD)
val PastelOrange = Color(0xFFFFD6A5)
val PastelYellow = Color(0xFFFDFFB6)
val PastelGreen = Color(0xFFCAFFBF)
val PastelBlue = Color(0xFF9BF6FF)
val PastelMauve = Color(0xFFA0C4FF)
val PastelPurple = Color(0xFFBDB2FF)
val PastelPink = Color(0xFFFFC6FF)

val colors = listOf(
	PastelRed,
	PastelOrange,
	PastelYellow,
	PastelGreen,
	PastelBlue,
	PastelMauve,
	PastelPurple,
	PastelPink
)

fun List<Color>.random() = this[Random.nextInt() % this.size]


val Blue10 = Color(0xFF000F5E)
val Blue20 = Color(0xFF001E92)
val Blue30 = Color(0xFF002ECC)
val Blue40 = Color(0xFF1546F6)
val Blue80 = Color(0xFFB8C3FF)
val Blue90 = Color(0xFFDDE1FF)

val DarkBlue10 = Color(0xFF00036B)
val DarkBlue20 = Color(0xFF000BA6)
val DarkBlue30 = Color(0xFF1026D3)
val DarkBlue40 = Color(0xFF3648EA)
val DarkBlue80 = Color(0xFFBBC2FF)
val DarkBlue90 = Color(0xFFDEE0FF)

val Yellow10 = Color(0xFF261900)
val Yellow20 = Color(0xFF402D00)
val Yellow30 = Color(0xFF5C4200)
val Yellow40 = Color(0xFF7A5900)
val Yellow80 = Color(0xFFFABD1B)
val Yellow90 = Color(0xFFFFDE9C)

val Red10 = Color(0xFF410001)
val Red20 = Color(0xFF680003)
val Red30 = Color(0xFF930006)
val Red40 = Color(0xFFBA1B1B)
val Red80 = Color(0xFFFFB4A9)
val Red90 = Color(0xFFFFDAD4)

val Grey10 = Color(0xFF191C1D)
val Grey20 = Color(0xFF2D3132)
val Grey80 = Color(0xFFC4C7C7)
val Grey90 = Color(0xFFE0E3E3)
val Grey95 = Color(0xFFEFF1F1)
val Grey99 = Color(0xFFFBFDFD)

val BlueGrey30 = Color(0xFF45464F)
val BlueGrey50 = Color(0xFF767680)
val BlueGrey60 = Color(0xFF90909A)
val BlueGrey80 = Color(0xFFC6C5D0)
val BlueGrey90 = Color(0xFFE2E1EC)