-- Notifications system
-- Triggered when a user is followed by someone

CREATE TABLE notifications (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL,
  actor_id   uuid        NOT NULL,
  type       text        NOT NULL DEFAULT 'new_follower',
  read       boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT notifications_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT notifications_actor_id_fkey
    FOREIGN KEY (actor_id) REFERENCES profiles(id) ON DELETE CASCADE
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only read their own notifications
CREATE POLICY "notifications_select"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- The acting user (follower) can create notifications for anyone they follow
CREATE POLICY "notifications_insert"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = actor_id);

-- Users can mark their own notifications as read
CREATE POLICY "notifications_update"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Fast lookup by recipient + time
CREATE INDEX notifications_user_id_created_at_idx
  ON notifications(user_id, created_at DESC);

-- Partial index for unread count queries
CREATE INDEX notifications_user_id_unread_idx
  ON notifications(user_id) WHERE read = false;
