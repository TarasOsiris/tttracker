package xyz.tleskiv.tt.model.mappers

import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.db.Opponent as OpponentRow

/**
 * Maps a stored opponent row onto the shared domain model.
 *
 * The row keeps [handedness] and [style] as raw strings, so without this every consumer has to know
 * the database encoding — which is how [xyz.tleskiv.tt.data.model.enums.Handedness.fromDb] ended up
 * being called by hand at one call site and forgotten at the others.
 *
 * `is_deleted` has no domain counterpart: every query that produces a row already filters it out.
 */
fun OpponentRow.toDomain(): Opponent = Opponent(
	id = id,
	name = name,
	club = club,
	rating = rating,
	handedness = handedness?.let { Handedness.fromDb(it) },
	style = style?.let { PlayingStyle.fromDb(it) },
	notes = notes,
	createdAt = created_at.toEpochMilliseconds(),
	updatedAt = updated_at.toEpochMilliseconds()
)
